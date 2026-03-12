import { getFirestore } from 'firebase-admin/firestore'
import { embedText } from './vertexai'
import { FieldValue } from 'firebase-admin/firestore'

// Indexing Function
// This function reads Firestore documents that do not yet have an embedding field,
// generates the embedding, and writes it back.

export async function indexCollection(
  hotelId: string,
  collectionName: string,
  toText: (data: Record<string, unknown>) => string
) {
  const db = getFirestore()
  const ref = db.collection('hotels').doc(hotelId).collection(collectionName)

  // only process docs that haven't been embedded yet
  const snap = await ref.where('embedding', '==', null).limit(500).get()

  console.log(`Embedding ${snap.size} docs in ${collectionName}`)

  const batch = db.batch()

  for (const doc of snap.docs) {
    const text = toText(doc.data())
    const embedding = await embedText(text)

    batch.update(doc.ref, {
      embedding,
      embeddedAt: FieldValue.serverTimestamp(),
    })
  }

  await batch.commit()
}
