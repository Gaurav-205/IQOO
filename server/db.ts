import { Pool } from "pg"

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_DqxFgmHTMz90@ep-long-hill-ae4sbxn9-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require"

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return res.rows
  } finally {
    client.release()
  }
}
