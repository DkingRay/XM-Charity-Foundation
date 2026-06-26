const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const hashed = await bcrypt.hash(password, 12)

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@xmcharityfoundation.org' },
    update: {},
    create: {
      email: 'admin@xmcharityfoundation.org',
      password: hashed,
      name: 'Admin',
    },
  })

  console.log(`Seeded admin: ${admin.email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
