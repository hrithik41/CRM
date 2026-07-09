import { prisma } from "../src/lib/prisma.js";
import users from "./seeds/userSeed.js";
import { seedIndustries } from "./seeds/industrySeed.js";
import { seedAccounts } from "./seeds/accountSeed.js";

async function main() {
  console.log("🌱 Seeding users...");
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
  console.log("✅ Users seeded successfully!");

  console.log("🌱 Seeding industries...");
  await seedIndustries(prisma);

  console.log("🌱 Seeding accounts...");
  await seedAccounts(prisma);

  console.log("✅ All seeds completed successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });