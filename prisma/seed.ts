import { PrismaClient } from '@prisma/client';
import { usersSeed } from './seed-data.ts/users';
const prisma = new PrismaClient();

async function main() {
  await Promise.all(usersSeed.map((user) => prisma.user.upsert(user)));
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
