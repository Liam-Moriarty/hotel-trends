import { VertexAI } from '@google-cloud/vertexai'

// The Gemini Answer Service
// This helper sends the retrieved documents plus the question to Gemini and returns a natural language answer

const vertexai = new VertexAI({
  project: 'hotel-health-dev',
  location: 'asia-southeast1',
})

export async function askGemini(
  contextDocs: Record<string, unknown>[],
  question: string
): Promise<string> {
  const model = vertexai.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { maxOutputTokens: 512 },
  })

  const context = contextDocs
    .map((d, i) => `Document ${i + 1}:\n${JSON.stringify(d, null, 2)}`)
    .join('\n\n')

  const prompt = `You are an AI assistant for a hotel management platform.
Use ONLY the documents below to answer the question.
If the documents don't contain enough information, say so clearly.

DOCUMENTS:
${context}

QUESTION: ${question}

ANSWER:`

  const result = await model.generateContent(prompt)

  if (!result.response.candidates || result.response.candidates.length === 0) {
    throw new Error('No response from Gemini')
  }

  const text = result.response.candidates[0].content.parts[0].text

  if (!text) {
    throw new Error('No text in response from Gemini')
  }

  return text
}
