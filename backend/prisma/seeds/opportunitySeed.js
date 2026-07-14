export async function seedOpportunities(prisma) {
  // 1. Fetch relations
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error(
      "No users found! Please run 'npm run seed' first to create users.",
    );
  }

  // Fetch accounts and contacts to randomly assign them to opportunities
  const accounts = await prisma.account.findMany({ take: 5 });
  const contacts = await prisma.contact.findMany({ take: 5 });

  if (accounts.length === 0) {
    console.warn("⚠️ No accounts found to associate with opportunities.");
  }

  const ownerId = user.user_id;

  // 2. Define Opportunities using enums exactly as per schema
  const opportunities = [
    {
      opportunity_name: "Google Q3 Cloud Migration",
      opportunity_close_date: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ), // Next month
      opportunity_stage: "PITCH_DONE",
      opportunity_type: "INBOUND",
      opportunity_engagement_form: "MEETING",
      opportunity_call_status: "CONNECTED",
      opportunity_account_fk: accounts[0]?.account_id || null,
      opportunity_contact_fk: contacts[0]?.contact_id || null,
    },
    {
      opportunity_name: "Microsoft Enterprise Renewal",
      opportunity_close_date: new Date(
        new Date().setMonth(new Date().getMonth() + 2),
      ), // 2 months from now
      opportunity_stage: "CLOSED_WON",
      opportunity_type: "OUTBOUND",
      opportunity_engagement_form: "SPONSOR",
      opportunity_payment_status: "PAID",
      opportunity_account_fk: accounts[1]?.account_id || null,
      opportunity_contact_fk: contacts[1]?.contact_id || null,
    },
    {
      opportunity_name: "Amazon AWS Consulting",
      opportunity_close_date: new Date(
        new Date().setMonth(new Date().getMonth() + 3),
      ),
      opportunity_stage: "CLOSED_LOST",
      opportunity_type: "INBOUND",
      opportunity_loss_reason: "BUDGET_CONSTRAINTS",
      opportunity_account_fk: accounts[2]?.account_id || null,
      opportunity_contact_fk: contacts[2]?.contact_id || null,
    },
    {
      opportunity_name: "Reliance Cloud Security Audit",
      opportunity_close_date: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ),
      opportunity_stage: "FOLLOW_UP",
      opportunity_type: "OUTBOUND",
      opportunity_engagement_form: "RESEARCH_CALL",
      opportunity_call_status: "PITCH_DONE",
      opportunity_account_fk: accounts[3]?.account_id || null,
      opportunity_contact_fk: contacts[3]?.contact_id || null,
    },
    {
      opportunity_name: "TCS AI Implementation",
      opportunity_close_date: new Date(
        new Date().setMonth(new Date().getMonth() + 4),
      ),
      opportunity_stage: "CONTRACT_OUT",
      opportunity_type: "INBOUND",
      opportunity_engagement_form: "OPERATION",
      opportunity_payment_status: "PENDING",
      opportunity_account_fk: accounts[4]?.account_id || null,
      opportunity_contact_fk: contacts[4]?.contact_id || null,
    },
  ];

  // 3. Insert them into the DB
  for (const opp of opportunities) {
    // Because opportunity doesn't have a unique ID/Code field like Account,
    // we search by name so running the seed multiple times won't duplicate them.
    const existingOpp = await prisma.opportunity.findFirst({
      where: { opportunity_name: opp.opportunity_name },
    });

    if (!existingOpp) {
      await prisma.opportunity.create({
        data: {
          ...opp,
          opportunity_owner_fk: ownerId,
        },
      });
    }
  }

  console.log("✅ Opportunity seed completed.");
}
