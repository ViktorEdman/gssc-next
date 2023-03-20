const { Client, Pool } = require("pg")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")

dotenv.config({ path: '../../.env' })
const ADMINPASSWORD = process.env.GSSC_ADMIN_PASSWORD || Math.random().toString(36).slice(-8)
const DBCONFIG = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST || "localhost",
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || "5432",
}

const pool = new Pool(DBCONFIG)

const connectToDb = async () => {
    try {
        const client = new Client(DBCONFIG)

        await client.connect()
        return client
    } catch (error) {
        console.error("Failed to connect to db", error)
        process.exit(1)
    }
}

const createUserTable = async () => {
    const SQL = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL UNIQUE,
        "password" VARCHAR(100) NOT NULL,
	    "role" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`;
    const client = await connectToDb()
    await client.query(SQL)
    await client.end()

}

const doesAdminExist = async () => {
    const SQL = `
    SELECT *
    FROM users
    WHERE name = 'admin'`
    try {
        const res = await pool.query(SQL)
        if (res.rows.length > 0) return true
        return false
    }
    catch (error) {
        return false
    }
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

const findUser = async (username) => {

}

const initDb = async () => {
    createUserTable()
    if (await doesAdminExist()) {
        console.log("Admin already exists\n", "Not creating admin account")
    } else {
        console.log("Admin does not exist\n", "Creating admin account with password " + ADMINPASSWORD)
        await createUser("admin", "password", "admin")
    }
}

initDb()

