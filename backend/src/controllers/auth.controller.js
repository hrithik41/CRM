import { prisma } from "../lib/prisma.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      user_email: email,
    },
  })
  
  console.log("User: ",user)

  if(!user){
    return res.status(404).json({
      success: false,
      message: "User not found",
    })
  }

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user.user_id,
      name: user.user_name,
      email: user.user_email,
      role: user.user_role,
      department: user.user_department
    },
  });
};