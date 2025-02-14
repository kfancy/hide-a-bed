import { z } from 'zod'
import { CouchConfig } from './config.mjs'
import { CouchDoc } from './crud.mjs'

export const ChangesOptions = z.object({
  feed: z.enum(['continuous']).default('continuous'),
  filter: z.string().optional(),
  inactivity_ms: z.number().default(60 * 60 * 1000),
  /** @type {number} */
  timeout: z.number().optional(),
  requestTimeout: z.number().default(2 * 60 * 1000),
  since: z.union([z.number(), z.literal('now')]).default(0),
  heartbeat: z.number().default(30 * 1000),
  style: z.enum(['main_only', 'all_docs']).default('main_only'),
  include_docs: z.boolean().default(false),
  query_params: z.record(z.any()).default({}),
  use_post: z.boolean().default(false)
}).partial()

export const ChangesResponse = z.object({
  id: z.string(),
  seq: z.number(),
  changes: z.array(z.object({
    rev: z.string()
  })),
  doc: CouchDoc.nullish().optional(),
  deleted: z.boolean().optional()
})

export const ChangesEmitter = z.object({
  on: z.function()
    .args(z.string(), z.function().args(z.any()).returns(z.void()))
    .returns(z.any()),
  removeListener: z.function()
    .args(z.string(), z.function().args(z.any()).returns(z.void()))
    .returns(z.any()),
  stop: z.function().returns(z.void())
})

export const Changes = z.function()
  .args(CouchConfig, ChangesOptions)
  .returns(ChangesEmitter)

/** @typedef { z.infer<typeof Changes> } ChangesSchema */
/** @typedef { z.infer<typeof ChangesEmitter> } ChangesEmitterSchema */
