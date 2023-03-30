import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash(process.env.GSSC_ADMIN_PASSWORD, 10)
    const admin = await prisma.users.upsert({
        where: {
            name: 'admin',
        },
        update: {
            password: hashedPassword,
        },
        create: {
            name: 'admin',
            password: hashedPassword,
            role: 'admin'
        },
    })
    console.log(admin)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })