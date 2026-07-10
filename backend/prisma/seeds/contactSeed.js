export async function seedContacts(prisma) {
  // 1. Get an existing User to act as the Contact Owner
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error("No users found! Please create a user first.");
  }

  // 2. Get some existing Accounts to link the contacts to
  const accounts = await prisma.account.findMany({ take: 3 });
  if (accounts.length === 0) {
    throw new Error(
      "No accounts found in the database. Please create an account first!",
    );
  }

  // 3. Define the dummy contacts based on your screenshot
  const dummyContacts = [
    {
      contact_code: "CON-000001",
      contact_firstname: "Nidhi",
      contact_lastname: "Agarwal",
      contact_title: "Executive Vice President",
      contact_professional_email: "nidhi.agarwal@example.com",
      contact_owner_fk: user.user_id,
      contact_account_fk: accounts[0]?.account_id,
      contact_call_status: "CONNECTED",
    },
    {
      contact_code: "CON-000002",
      contact_firstname: "Kanika",
      contact_lastname: "Gupta",
      contact_title: "Manager - TAX",
      contact_professional_email: "kanika.gupta@example.com",
      contact_owner_fk: user.user_id,
      contact_account_fk: accounts[1 % accounts.length]?.account_id,
      contact_call_status: "NOT_CONNECTED",
    },
    {
      contact_code: "CON-000003",
      contact_firstname: "Govind",
      contact_lastname: "M.",
      contact_title: "Financial Controller",
      contact_professional_email: "govind.m@example.com",
      contact_owner_fk: user.user_id,
      contact_account_fk: accounts[2 % accounts.length]?.account_id,
      contact_call_status: "WRONG_NUMBER",
    },
    {
      contact_code: "CON-000004",
      contact_firstname: "Rekha",
      contact_lastname: "Bansal",
      contact_title: "Vice President - Finance",
      contact_professional_email: "rekha.b@example.com",
      contact_owner_fk: user.user_id,
      contact_account_fk: accounts[0]?.account_id,
      contact_call_status: "CONNECTED",
    },
  ];

  // 4. Insert them into the database
  for (const contact of dummyContacts) {
    await prisma.contact.upsert({
      where: { contact_code: contact.contact_code },
      update: {},
      create: contact,
    });
  }

  console.log("✅ Contact seed completed.");
}
