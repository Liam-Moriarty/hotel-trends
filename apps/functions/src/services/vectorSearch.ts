import { getFirestore } from 'firebase-admin/firestore'

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

  return snap.docs.map(d => d.data())
}
