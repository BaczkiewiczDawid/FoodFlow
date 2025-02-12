import postgres from 'postgres'
import {drizzle} from 'drizzle-orm/postgres-js'

const connectionString = process.env.DATABASE_URL

if (!connectionString) throw new Error('DATABASE_URL must be set')

export const client = postgres(connectionString, {prepare: false})
export const db = drizzle(client)