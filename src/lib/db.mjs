import pg from "pg"
const {  Pool } = pg
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config()

const ADMINPASSWORD = process.env.GSSC_ADMIN_PASSWORD || Math.random().toString(36).slice(-8)
const DBCONFIG = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST || "localhost",
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || "5432", 
    max: 10,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 1000
}

const pool = new Pool(DBCONFIG)

const createUserTable = async () => {
    const SQL = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL UNIQUE,
        "password" VARCHAR(100) NOT NULL,
	    "role" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`;
    await pool.query(SQL)

}


const createUser = async (username, password, role) => {
    const SQL = `
    INSERT INTO users(name, password, role)
    VALUES ('${username}', '${password}', '${role}');
    `
    try {
        await pool.query(SQL)
    }
    catch (error) {
        console.log(error)
    }
}
export const getUserByName = async (username) => {
    const res = await pool.query('SELECT * FROM users WHERE name = $1::text', [username])
    return res.rows[0]
}

const deleteUser = async (id) => {
    const res = await pool.query('DELETE FROM users WHERE id = $1::integer', [id])
    return res
}

const initDb = async () => {
    await createUserTable()
    const adminUser = await getUserByName('admin')
    if (adminUser) {
        console.log("Admin already exists") 
        console.log("Not creating admin account")
    } else {
        console.log("Admin does not exist")
        console.log("Creating admin account with password " + ADMINPASSWORD)
        const password = await bcrypt.hash(ADMINPASSWORD, 10)
        await createUser("admin", password, "admin")
    }
    console.log(await getUserByName('admin'))
}

initDb()

