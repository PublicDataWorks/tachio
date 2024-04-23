import { LIB_VERSION } from 'electric-sql/version'
import { makeElectricContext } from 'electric-sql/react'
import { uniqueTabId } from 'electric-sql/util'
import { electrify, ElectricDatabase } from 'electric-sql/wa-sqlite'
import { Electric, schema } from './generated/client'
import type { Session } from '@supabase/supabase-js'

export type { Issues } from './generated/client'

export const { ElectricProvider, useElectric } = makeElectricContext<Electric>()

const discriminator = 'linearlite'

const DEV_MODE = import.meta.env.DEV
const DEBUG_ENV = import.meta.env.DEBUG

// We can override the debug mode with a query param: ?debug=true or ?debug=false
const searchParams = new URLSearchParams(window.location.search)
const debugParam = searchParams.get('debug')

export const DEBUG = debugParam ? debugParam === 'true' : DEV_MODE || DEBUG_ENV

// We export dbName so that we can delete the database if the schema changes
export let dbName: string

export const initElectric = async (session: Session) => {
  const config = {
    url: import.meta.env.ELECTRIC_URL
  }
  const { tabId } = uniqueTabId()
  dbName = `${discriminator}-${LIB_VERSION}-${tabId}.db`
  const conn = await ElectricDatabase.init(dbName)
  if (DEBUG) {
    console.log('initElectric')
    console.log('dbName', dbName)
    console.log(conn)
    console.log(schema)
    console.log(config)
  }
  const electric = await electrify(conn, schema, config)
  const token = session.access_token
  console.log(token, 'asdasd')
  await electric.connect(token)
  console.log(electric, 'asdazzzz')
  return electric
}
