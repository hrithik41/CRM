import { prisma } from "../src/lib/prisma.js";
import users from "./seeds/userSeed.js";

async function main() {
  console.log("🌱 Seeding users...");

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("Users seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });