// @ts-check */
import { bulkGet, bulkSave, bulkRemove, bulkGetDictionary } from './impl/bulk.mjs'
import { get, put } from './impl/crud.mjs'
import { patch, patchDangerously } from './impl/patch.mjs'
import { query } from './impl/query.mjs'
import { queryStream } from './impl/stream.mjs'
import { createQuery } from './impl/queryBuilder.mjs'
import { withRetry } from './impl/retry.mjs'
import { BulkSave, BulkGet, BulkRemove, BulkGetDictionary } from './schema/bulk.mjs'
import { CouchConfig } from './schema/config.mjs'
import { SimpleViewQuery, SimpleViewQueryResponse } from './schema/query.mjs'
import { SimpleViewQueryStream, OnRow } from './schema/stream.mjs'
import { Patch, PatchDangerously } from './schema/patch.mjs'
import { CouchDoc, CouchDocResponse, CouchPut, CouchGet } from './schema/crud.mjs'
import { Bind } from './schema/bind.mjs'

const schema = {
  CouchConfig,
  SimpleViewQuery,
  SimpleViewQueryResponse,
  SimpleViewQueryStream,
  OnRow,
  BulkSave,
  BulkGet,
  BulkRemove,
  BulkGetDictionary,
  CouchGet,
  CouchPut,
  CouchDoc,
  CouchDocResponse,
  Patch,
  PatchDangerously
}

/** @type { import('./schema/bind.mjs').BindSchema } */
const bindConfig = Bind.implement((
  /** @type { import('./schema/config.mjs').CouchConfigSchema } */
  config
) => {
  // Default retry options
  const retryOptions = {
    maxRetries: config.maxRetries ?? 10,
    initialDelay: config.initialDelay ?? 1000,
    backoffFactor: config.backoffFactor ?? 2
  }

  return {
    get: config.bindWithRetry ? withRetry(get.bind(null, config), retryOptions) : get.bind(null, config),
    put: config.bindWithRetry ? withRetry(put.bind(null, config), retryOptions) : put.bind(null, config),
    bulkGet: config.bindWithRetry ? withRetry(bulkGet.bind(null, config), retryOptions) : bulkGet.bind(null, config),
    bulkSave: config.bindWithRetry ? withRetry(bulkSave.bind(null, config), retryOptions) : bulkSave.bind(null, config),
    query: config.bindWithRetry ? withRetry(query.bind(null, config), retryOptions) : query.bind(null, config),
    queryStream: config.bindWithRetry ? withRetry(queryStream.bind(null, config), retryOptions) : queryStream.bind(null, config),
    // Sugar Methods
    patch: config.bindWithRetry ? withRetry(patch.bind(null, config), retryOptions) : patch.bind(null, config),
    patchDangerously: patchDangerously.bind(null, config), // patchDangerously not included in retry
    bulkRemove: config.bindWithRetry ? withRetry(bulkRemove.bind(null, config), retryOptions) : bulkRemove.bind(null, config),
    bulkGetDictionary: config.bindWithRetry ? withRetry(bulkGetDictionary.bind(null, config), retryOptions) : bulkGetDictionary.bind(null, config)
  }
})

export {
  get,
  put,
  bulkGet,
  bulkSave,
  query,
  queryStream,
  schema,

  // sugar methods
  patch,
  patchDangerously,
  bulkRemove,
  bulkGetDictionary,

  bindConfig,
  withRetry,
  createQuery
}
