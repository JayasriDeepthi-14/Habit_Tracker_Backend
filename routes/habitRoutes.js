import express from "express";
import {
  addHabit,
  getHabits,
  deleteHabit,
  trackHabit
} from "../controllers/habitController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", addHabit);
router.get("/", getHabits);
router.post("/track", trackHabit);
router.delete("/:id", deleteHabit);

export default router;