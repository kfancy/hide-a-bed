import { get, put } from './crud.mjs'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function patch (config, id, properties) {
  const maxRetries = config.retries || 5
  const delay = config.delay || 1000
  let attempts = 0

  while (attempts <= maxRetries) {
    try {
      const doc = await get(config, id)
      const updatedDoc = { ...doc, ...properties }
      return await put(config, updatedDoc)
    } catch (err) {
      attempts++
      if (attempts > maxRetries) throw new Error(`Failed to patch after ${maxRetries} attempts`)
      await sleep(delay)
    }
  }
}
