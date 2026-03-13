import { getFirestore } from 'firebase-admin/firestore'

// When a user asks a question, we embed it using the same model,
// query Firestore’s built-in vector search to find the most similar documents,
// then pass those documents to Gemini.

// Query Firestore Vector Search
// Firestore’s findNearest() method does all the heavy lifting.
// It takes your question vector and returns the top K documents whose
// embedding field is most similar

export async function findSimilarDocs(
  hotelId: string,
  collection: string,
  queryVector: number[],
  topK: number = 5
): Promise<Record<string, unknown>[]> {
  const db = getFirestore()
  const ref = db.collection('hotels').doc(hotelId).collection(collection)

  const snap = await ref
    .findNearest({
      vectorField: 'embedding',
      queryVector,
      limit: topK,
      distanceMeasure: 'COSINE',
    })
    .get()

  return snap.docs.map(d => {
    const { embedding, embeddedAt, seededAt, ...rest } = d.data()
    void embedding
    void embeddedAt
    void seededAt
    return rest
  })
}
