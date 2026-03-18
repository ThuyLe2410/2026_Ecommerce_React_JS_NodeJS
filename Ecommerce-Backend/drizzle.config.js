import {defineConfig} from 'drizzle-kit';
import { configDotenv } from 'dotenv';

configDotenv();

export default defineConfig({
    schema:'./db/schema.js',
    out:'./drizzle',
    dialect:'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL 
    }
})