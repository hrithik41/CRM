import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  connectionLimit: 5,
  database: "crm_db",
  user: "root",
  password: "root",
});
const prisma = new PrismaClient({ adapter });