import { GoogleGenerativeAI, SchemaType, Content, Part, Tool, Schema } from '@google/generative-ai'
import { runBigQuery, BQ_SCHEMA_HINT } from './bigquery.js'
import { ChatMessage } from '@repo/shared'

// The Gemini Answer Service
// Uses function calling so Gemini can query BigQuery for structured data
// (revenue, occupancy, rate plans, rooms) while also using RAG context docs
// for unstructured data (sentiment, alerts, snapshots).

// Tool definition: lets Gemini call BigQuery when it needs structured data
const bqTool: Tool = {
  functionDeclarations: [
    {
      name: 'query_hotel_data',
      description:
        'Run a BigQuery SQL query to retrieve structured hotel data: reservations, revenue, occupancy, rate plans, or room inventory. Use this when the question requires exact numbers, aggregations, or data not found in the context documents.',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          sql: {
            type: SchemaType.STRING,
            description: 'A valid BigQuery standard SQL query.',
          } as Schema,
        },
        required: ['sql'],
      },
    },
  ],
}

export async function askGemini(
  contextDocs: Record<string, unknown>[],
  question: string,
  history: ChatMessage[] = []
): Promise<string> {
  const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const systemInstruction = `You are an AI assistant for a hotel management platform called Hytel.
You have two sources of information:
1. CONTEXT DOCUMENTS provided with each question (qualitative data: sentiment, alerts, performance snapshots)
2. A BigQuery tool to query structured data (reservations, revenue, occupancy, rate plans, rooms)

Use context documents for questions about guest sentiment, alerts, and performance summaries.
Use the query_hotel_data function to retrieve structured data (rate plans, revenue, occupancy, rooms).
IMPORTANT: When you need structured data, you MUST call query_hotel_data. NEVER return raw SQL as your answer text.
You may use both sources if needed. Always give a specific, helpful answer.

Format your responses using markdown:
- Use tables for structured data (rate plans, room types, availability figures)
- Use bullet points or numbered lists for multiple items
- Use **bold** for key metrics or important values
- **Always format dates in a human-readable way, like March 11, 2026 (Month Day, Year).**
- Keep responses concise but complete

${BQ_SCHEMA_HINT}`

  const model = genai.getGenerativeModel({
    model: 'gemini-3.1-flash-lite',
    generationConfig: { maxOutputTokens: 1024 },
    tools: [bqTool],
    systemInstruction,
  })

  const context = contextDocs
    .map((d, i) => `Document ${i + 1}:\n${JSON.stringify(d, null, 2)}`)
    .join('\n\n')

  const userPrompt = `CONTEXT DOCUMENTS:
${context || 'No context documents available.'}

QUESTION: ${question}`

  // SDK requires history to start with 'user' — drop any leading model messages
  const rawHistory = history as Content[]
  const firstUserIdx = rawHistory.findIndex(m => m.role === 'user')
  const safeHistory = firstUserIdx >= 0 ? rawHistory.slice(firstUserIdx) : []

  const chat = model.startChat({ history: safeHistory })
  let result = await chat.sendMessage(userPrompt)

  // Agentic loop: Gemini may call BigQuery one or more times before answering
  for (let i = 0; i < 3; i++) {
    const candidate = result.response.candidates?.[0]
    if (!candidate?.content) break

    const functionCalls = candidate.content.parts.filter((p: Part) => p.functionCall)
    if (functionCalls.length === 0) break

    // Execute each BigQuery function call and return results to Gemini
    const functionResponses = await Promise.all(
      functionCalls.map(async (part: Part) => {
        const call = part.functionCall!
        let queryResult: unknown
        try {
          const rows = await runBigQuery((call.args as Record<string, string>).sql)
          queryResult = rows.length > 0 ? rows : 'No results found.'
        } catch (err) {
          queryResult = `Query error: ${err instanceof Error ? err.message : String(err)}`
        }
        return {
          functionResponse: {
            name: call.name,
            response: { result: queryResult },
          },
        }
      })
    )

    result = await chat.sendMessage(functionResponses)
  }

  const finalCandidate = result.response.candidates?.[0]
  if (!finalCandidate?.content) throw new Error('No response from Gemini')

  const text = finalCandidate.content.parts.find(
    (p: Part) => p.text && !(p as unknown as Record<string, unknown>).thought
  )?.text
  if (!text) throw new Error('No text in response from Gemini')

  return text
}
