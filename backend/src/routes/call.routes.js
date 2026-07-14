import express from "express";
import {
  createCall,
  getCalls,
  getCallById,
  updateCall,
  deleteCall,
} from "../controllers/call.controller.js";

const router = express.Router();

router.post("/", createCall);
router.get("/", getCalls);
router.get("/:id", getCallById);
router.put("/:id", updateCall);
router.delete("/:id", deleteCall);

export default router;
