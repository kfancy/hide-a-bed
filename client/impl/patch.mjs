import { get, put } from './crud.mjs'
import { CouchPatch } from '../schema/patch.mjs'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const patch = CouchPatch.implement(async (config, id, properties) => {
  const maxRetries = config.retries || 5
  const delay = config.delay || 1000
  let attempts = 0

  while (attempts <= maxRetries) {
    try {
      const doc = await get(config, id)
      const updatedDoc = { ...doc, ...properties }
      const result = await put(config, updatedDoc)

      // Check if the response indicates a conflict
      if (result.ok) {
        return result
      }
      // If not ok, treat as conflict and retry
      attempts++
      if (attempts > maxRetries) {
        throw new Error(`Failed to patch after ${maxRetries} attempts`)
      }
      await sleep(delay)
    } catch (err) {
      // Handle other errors (network, etc)
      attempts++
      if (attempts > maxRetries) {
        throw new Error(`Failed to patch after ${maxRetries} attempts: ${err.message}`)
      }
      await sleep(delay)
    }
  }
})
