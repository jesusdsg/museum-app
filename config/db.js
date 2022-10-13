import { createPool } from "mysql2/promise";

const pool = createPool({
    host: process.env.NEXT_PUBLIC_DB_HOST,
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    port: process.env.NEXT_PUBLIC_DB_PORT,
    database: process.env.NEXT_PUBLIC_DB_NAME
})

export {pool}