export async function seedAccounts(prisma) {
  const user = await prisma.user.findFirst();
  const industries = await prisma.industry.findMany();
  const industryMap = new Map(
    industries.map((industry) => [
      industry.industry_name,
      industry.industry_id,
    ]),
  );

  if (!user) {
    throw new Error(
      "No users found! Please run 'npm run seed' first to create users.",
    );
  }

  const ownerId = user.user_id;

  const accounts = [
    {
      account_code: "ACC-000001",
      account_name: "Google India",
      industry: "Technology",
      account_city: "Bengaluru",
    },
    {
      account_code: "ACC-000002",
      account_name: "Microsoft India",
      industry: "Software",
      account_city: "Hyderabad",
    },
    {
      account_code: "ACC-000003",
      account_name: "Amazon India",
      industry: "E-Commerce",
      account_city: "Bengaluru",
    },
    {
      account_code: "ACC-000004",
      account_name: "Reliance Industries",
      industry: "Oil & Gas",
      account_city: "Mumbai",
    },
    {
      account_code: "ACC-000005",
      account_name: "Tata Consultancy Services",
      industry: "IT Services",
      account_city: "Mumbai",
    },
    {
      account_code: "ACC-000006",
      account_name: "Infosys",
      industry: "IT Services",
      account_city: "Bengaluru",
    },
    {
      account_code: "ACC-000007",
      account_name: "HDFC Bank",
      industry: "Banking",
      account_city: "Mumbai",
    },
    {
      account_code: "ACC-000008",
      account_name: "Adani Enterprises",
      industry: "Infrastructure",
      account_city: "Ahmedabad",
    },
    {
      account_code: "ACC-000009",
      account_name: "Wipro",
      industry: "Technology",
      account_city: "Bengaluru",
    },
    {
      account_code: "ACC-000010",
      account_name: "Mahindra & Mahindra",
      industry: "Automobile",
      account_city: "Mumbai",
    },
  ];

  for (const account of accounts) {
    const { industry, ...accountData } = account;
    const industryId = industryMap.get(industry);

    await prisma.account.upsert({
      where: {
        account_code: account.account_code,
      },
      update: {},
      create: {
        ...accountData,
        account_industry_fk: industryId || null,
        account_owner_fk: ownerId,
      },
    });
  }

  console.log("✅ Account seed completed.");
}
