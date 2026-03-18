import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from 'dotenv';

dotenv.config()

// Get database_url from env
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error ('DATABASE_URL is not defined in .env file')
}

// create PostgreSQL client (for Neon)
export const client = postgres(connectionString, {
  ssl: 'require',
  max:10,
  idle_timeout:20,
  connect_timeout:10
})

// create drizzle instance
export const db = drizzle(client)

// test db connection
export const testConnection = async () => {
  try {
    await client `SELECT 1 as result`;
    console.log('Database connected successfully (Neon + Drizzle)');
    return true
  } catch (error) {
    console.error('DB connection failed:', error.message);
    return false
  }
}