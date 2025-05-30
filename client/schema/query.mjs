import { z } from 'zod'
import { CouchConfig } from './config.mjs'

export const ViewRow = z.object({
  id: z.string().optional(),
  key: z.any().nullable(),
  value: z.any().nullable(),
  doc: z.object({}).passthrough().optional().nullish(),
  error: z.string().optional().describe('usually not_found, if something is wrong with this doc')
})
/** @typedef { z.infer<typeof ViewRow> } ViewRowSchema */

export const SimpleViewQueryResponse = z.object({
  error: z.string().optional().describe('if something is wrong'),
  rows: z.array(ViewRow)
}).passthrough()
/** @typedef { z.infer<typeof SimpleViewQueryResponse> } SimpleViewQueryResponseSchema */

export const SimpleViewOptions = z.object({
  startkey: z.any().optional(),
  endkey: z.any().optional(),
  descending: z.boolean().optional().describe('sort results descending'),
  skip: z.number().nonnegative().optional().describe('skip this many rows'),
  limit: z.number().nonnegative().optional().describe('limit the results to this many rows'),
  key: z.any().optional(),
  keys: z.array(z.any()).optional(),
  include_docs: z.boolean().optional().describe('join the id to the doc and return it'),
  reduce: z.boolean().optional().describe('reduce the results'),
  group: z.boolean().optional().describe('group the results'),
  group_level: z.number().positive().optional().describe('group the results at this level')
}).optional().describe('query options')
/** @typedef { z.infer<typeof SimpleViewOptions> } SimpleViewOptionsSchema */

export const SimpleViewQuery = z.function().args(
  CouchConfig,
  z.string().describe('the view name'),
  SimpleViewOptions
).returns(z.promise(SimpleViewQueryResponse))
/** @typedef { z.infer<typeof SimpleViewQuery> } SimpleViewQuerySchema */

export const SimpleViewQueryBound = z.function().args(
  z.string().describe('the view name'),
  SimpleViewOptions
).returns(z.promise(SimpleViewQueryResponse))
/** @typedef { z.infer<typeof SimpleViewQueryBound> } SimpleViewQueryBoundSchema */
