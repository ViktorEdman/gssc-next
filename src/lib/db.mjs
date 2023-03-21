import pg from "pg"
const {  Pool } = pg
import dotenv from "dotenv"
import bcrypt from "bcrypt"

const ENVPATH = process.env.NODE_ENV === "development"
                ? ".env.development"
                : ".env"
dotenv.config({path: ".env.development"})

const ADMINPASSWORD = process.env.GSSC_ADMIN_PASSWORD || Math.random().toString(36).slice(-8)
const DBCONFIG = {
    user: process.env.POSTGRES_USER || "gssc",
    host: process.env.POSTGRES_HOST || "localhost",
    database: process.env.POSTGRES_DATABASE || "gssc",
    password: process.env.POSTGRES_PASSWORD || "gssc",
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

const updateUserPassword = async (id, password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const SQL = `UPDATE users SET password = '${hashedPassword}' WHERE id = ${id};`
    const res = await pool.query(SQL)
    return res
}

const initDb = async () => {
    await createUserTable()
    const adminUser = await getUserByName('admin')
    if (adminUser) {
        console.log("Admin already exists") 
        console.log("Not creating admin account")
        if (!(await bcrypt.compare(ADMINPASSWORD, adminUser.password))) {
            console.log("Updating admin password according to env variable")
            await updateUserPassword(adminUser.id, ADMINPASSWORD)
        }
    } else {
        console.log("Admin does not exist")
        console.log("Creating admin account with password " + ADMINPASSWORD)
        const password = await bcrypt.hash(ADMINPASSWORD, 10)
        await createUser("admin", password, "admin")
    }
}

initDb()

