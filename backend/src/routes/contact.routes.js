import express from "express";
import {
  getContacts,
  createContact,
  updateContact,
  getContactById,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/", getContacts);
router.post("/", createContact);
router.get("/:id", getContactById);
router.put("/:id", updateContact);

export default router;
