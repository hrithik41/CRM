import express from "express";
import {
  getContacts,
  createContact,
  updateContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/", getContacts);
router.post("/", createContact);
router.put("/:id", updateContact);

export default router;
