import express from "express";
import {
  getOpportunities,
  createOpportunity,
  updateOpportunity,
} from "../controllers/opportunity.controller.js";

const router = express.Router();

router.get("/", getOpportunities);
router.post("/", createOpportunity);
router.put("/:id", updateOpportunity);
// router.get('/:id', getOpportunityById);
// router.patch('/:id', updateOpportunity);
// router.delete('/:id', deleteOpportunity);

export default router;
