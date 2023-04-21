import {PoolConfig, Pool} from 'pg'
import dotenv from 'dotenv'
dotenv.config({path: __dirname+"../../"})

const config: PoolConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
}
const pool = new Pool(config)

export default pool;
