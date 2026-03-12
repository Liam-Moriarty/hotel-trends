import { embedText } from './vertexai.js'
import { findSimilarDocs } from './vectorSearch.js'
import { askGemini } from './gemini.js'

// The RAG Orchestrator
// This service ties everything together.
// It embeds the question, searches Firestore, and calls Gemini:

export async function ragQuery(
  hotelId: string,
  question: string
): Promise<{ answer: string; sourceCount: number }> {
  // 1. Embed the question
  const questionVector = await embedText(question)

  // 2. Search across collections in parallel
  const [snapshots, alerts, sentiment] = await Promise.all([
    findSimilarDocs(hotelId, 'snapshots', questionVector, 3),
    findSimilarDocs(hotelId, 'alerts', questionVector, 2),
    findSimilarDocs(hotelId, 'sentiment', questionVector, 2),
  ])

  const allDocs = [...snapshots, ...alerts, ...sentiment]

  // 3. Ask Gemini with the retrieved docs as context
  const answer = await askGemini(allDocs, question)

  return { answer, sourceCount: allDocs.length }
}
