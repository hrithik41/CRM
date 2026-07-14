import { prisma } from './src/lib/prisma.js';
async function fix() {
  const user = await prisma.user.findFirst();
  if (user) {
    await prisma.contact.updateMany({
      where: { contact_owner_fk: null },
      data: { contact_owner_fk: user.user_id }
    });
    console.log('Fixed owners to: ' + user.user_name);
  } else {
    console.log('No users found');
  }
}
fix().catch(console.error).finally(() => process.exit(0));
