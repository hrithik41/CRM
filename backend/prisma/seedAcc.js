import { prisma } from "../src/lib/prisma.js";

async function main() {
  const ownerId = "f338e335-3b39-4090-8e72-f5b7fecc264c";

  const accounts = [
    {
      account_code: "ACC-000001",
      account_name: "Google India",
      account_industry: "Technology",
      account_city: "Bengaluru",
    },
    {
      account_code: "ACC-000002",
      account_name: "Microsoft India",
      account_industry: "Software",
      account_city: "Hyderabad",
    },
    {
      account_code: "ACC-000003",
      account_name: "Amazon India",
      account_industry: "E-Commerce",
      account_city: "Bengaluru",
    },
    {
      account_code: "ACC-000004",
      account_name: "Reliance Industries",
      account_industry: "Oil & Gas",
      account_city: "Mumbai",
    },
    {
      account_code: "ACC-000005",
      account_name: "Tata Consultancy Services",
      account_industry: "IT Services",
      account_city: "Mumbai",
    },
    {
      account_code: "ACC-000006",
      account_name: "Infosys",
      account_industry: "IT Services",
      account_city: "Bengaluru",
    },
    {
      account_code: "ACC-000007",
      account_name: "HDFC Bank",
      account_industry: "Banking",
      account_city: "Mumbai",
    },
    {
      account_code: "ACC-000008",
      account_name: "Adani Enterprises",
      account_industry: "Infrastructure",
      account_city: "Ahmedabad",
    },
    {
      account_code: "ACC-000009",
      account_name: "Wipro",
      account_industry: "Technology",
      account_city: "Bengaluru",
    },
    {
      account_code: "ACC-000010",
      account_name: "Mahindra & Mahindra",
      account_industry: "Automobile",
      account_city: "Mumbai",
    },
  ];

  for (const account of accounts) {
    await prisma.account.upsert({
      where: {
        account_code: account.account_code,
      },
      update: {},
      create: {
        ...account,
        account_owner_fk: ownerId,
      },
    });
  }

  console.log("✅ Account seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
