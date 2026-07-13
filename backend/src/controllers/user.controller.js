import { prisma } from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
      },
      where: {
        user_status: true,
      }
    });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
