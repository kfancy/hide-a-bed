import { z } from 'zod'
import { CouchConfig } from './config.mjs'
import { CouchDoc } from './crud.mjs'

export const BulkSaveResponseSchema = z.array(z.object({
  ok: z.boolean().nullish(),
  id: z.string().nullish(),
  rev: z.string().nullish(),
  error: z.string().nullish().describe('if an error occured, one word reason, eg conflict'),
  reason: z.string().nullish().describe('a full error message')
}))
/** @typedef { z.infer<typeof BulkSaveResponseSchema> } Response */

export const BulkSave = z.function().args(
  CouchConfig,
  z.array(z.object({
    _id: z.string()
  }).passthrough())
).returns(z.promise(BulkSaveResponseSchema))
/** @typedef { z.infer<typeof BulkSave> } BulkSaveSchema */

export const BulkSaveBound = z.function().args(
  z.array(z.object({
    _id: z.string()
  }).passthrough())
).returns(z.promise(BulkSaveResponseSchema))
/** @typedef { z.infer<typeof BulkSaveBound> } BulkSaveBoundSchema */

export const BulkGet = z.function().args(
  CouchConfig,
  z.array(z.string().describe('the ids to get'))
).returns(z.promise(z.array(CouchDoc.nullish())))
/** @typedef { z.infer<typeof BulkGet> } BulkGetSchema */

export const BulkGetBound = z.function().args(
  z.array(z.string().describe('the ids to get'))
).returns(z.promise(z.array(CouchDoc.nullish())))
/** @typedef { z.infer<typeof BulkGetBound> } BulkGetBoundSchema */

export const BulkRemove = z.function().args(
  CouchConfig,
  z.array(z.string().describe('the ids to delete'))
).returns(z.promise(BulkSaveResponseSchema))
/** @typedef { z.infer<typeof BulkRemove> } BulkRemoveSchema */

export const BulkRemoveBound = z.function().args(
  z.array(z.string().describe('the ids to delete'))
).returns(z.promise(BulkSaveResponseSchema))
/** @typedef { z.infer<typeof BulkRemoveBound> } BulkRemoveBoundSchema */
