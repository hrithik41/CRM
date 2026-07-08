import express from "express";
import { getAccounts, getAccountById, createAccount, updateAccount, deleteAccounts } from "../controllers/account.controller.js";

const router = express.Router();

router.get("/", getAccounts);
router.get("/:id", getAccountById);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/", deleteAccounts);

export default router;