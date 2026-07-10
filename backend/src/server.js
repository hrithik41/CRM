import express from "express";
import authRoutes from "./routes/auth.routes.js";
import accountRoutes from "./routes/account.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("CRM API Running");
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use!`);
    console.error(`This usually happens if another terminal is running the server, or nodemon restarted too quickly.`);
    process.exit(1); // Force a crash so nodemon doesn't say "clean exit"
  } else {
    console.error('❌ Server error:', error);
  }
});