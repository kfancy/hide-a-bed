// @ts-check
import { z } from 'zod'
import { CouchConfig } from './config.mjs'
import { BulkSaveBound, BulkGetBound, BulkRemoveBound, BulkGetDictionaryBound, BulkSaveTransactionBound } from './bulk.mjs'
import { CouchGetBound, CouchPutBound, CouchGetAtRevBound } from './crud.mjs'
import { PatchBound } from './patch.mjs'
import { SimpleViewQueryBound } from './query.mjs'
import { SimpleViewQueryStreamBound } from './stream.mjs'
import { CreateLockBound, RemoveLockBound } from './sugar/lock.mjs'
import { ChangesBound } from './changes.mjs'

const BindReturns = z.object({
  bulkGet: BulkGetBound,
  bulkSave: BulkSaveBound,
  bulkRemove: BulkRemoveBound,
  bulkGetDictionary: BulkGetDictionaryBound,
  bulkSaveTransaction: BulkSaveTransactionBound,
  get: CouchGetBound,
  getAtRev: CouchGetAtRevBound,
  put: CouchPutBound,
  patch: PatchBound,
  query: SimpleViewQueryBound,
  queryStream: SimpleViewQueryStreamBound,
  createLock: CreateLockBound,
  removeLock: RemoveLockBound,
  changes: ChangesBound
})

export const Bind = z.function().args(CouchConfig).returns(BindReturns)
/** @typedef { z.infer<typeof Bind> } BindSchema */
