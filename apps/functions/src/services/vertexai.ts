import { PredictionServiceClient } from '@google-cloud/aiplatform'
import { helpers } from '@google-cloud/aiplatform'

// Embedding Service
// This helper converts any text string into a 768-dimension vector using Vertex AI

const PROJECT = 'hotel-trends-stage'
const LOCATION = 'asia-southeast1'
const MODEL = 'text-embedding-004'

// Embedding Service

const client = new PredictionServiceClient({
  apiEndpoint: `${LOCATION}-aiplatform.googleapis.com`,
})

export async function embedText(text: string): Promise<number[]> {
  const endpoint =
    `projects/${PROJECT}/locations/${LOCATION}` + `/publishers/google/models/${MODEL}`

  const instance = helpers.toValue({ content: text.slice(0, 1000) })
  const instances = [instance!]

  const [response] = await client.predict({
    endpoint,
    instances,
    parameters: helpers.toValue({ outputDimensity: 768 }),
  })

  //   null check before accessing the predictions
  if (!response.predictions || response.predictions.length === 0) {
    throw new Error('No predictions returned from Vertex AI Embeddings')
  }

  const values =
    response.predictions[0].structValue?.fields?.embeddings?.structValue?.fields?.values?.listValue
      ?.values ?? []

  return values.map(v => v.numberValue ?? 0)
}
