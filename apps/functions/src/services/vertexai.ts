// Embedding Service
// This helper converts any text string into a 768-dimension vector using Vertex AI.
//
// WHY dynamic import: @google-cloud/aiplatform loads gRPC native bindings and
// probes for Google credentials (ADC / metadata server) at module load time.
// On a local dev machine that probe hangs ~10 s before timing out, which causes
// the Firebase Functions emulator to exceed its 10-second function-discovery
// timeout. Lazy-loading defers all of that to the first actual call.

const PROJECT = 'hotel-trends-stage'
const LOCATION = 'us-central1'
const MODEL = 'text-embedding-004'

export async function embedText(text: string): Promise<number[]> {
  const { PredictionServiceClient, helpers } = await import('@google-cloud/aiplatform')

  const client = new PredictionServiceClient({
    apiEndpoint: `${LOCATION}-aiplatform.googleapis.com`,
  })

  const endpoint =
    `projects/${PROJECT}/locations/${LOCATION}` + `/publishers/google/models/${MODEL}`

  const instance = helpers.toValue({ content: text.slice(0, 1000) })
  const instances = [instance!]

  const [response] = await client.predict({
    endpoint,
    instances,
    parameters: helpers.toValue({ outputDimensionality: 768 }),
  })

  if (!response.predictions || response.predictions.length === 0) {
    throw new Error('No predictions returned from Vertex AI Embeddings')
  }

  const values =
    response.predictions[0].structValue?.fields?.embeddings?.structValue?.fields?.values?.listValue
      ?.values ?? []

  return values.map(v => v.numberValue ?? 0)
}
