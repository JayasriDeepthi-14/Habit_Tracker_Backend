import express from "express";
import supabase from "../config/db.js";

import {
  addHabit,
  getHabits,
  deleteHabit,
  trackHabit,
  updateHabit
} from "../controllers/habitController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", addHabit);
router.get("/", getHabits);
router.post("/track", trackHabit);
router.delete("/:id", deleteHabit);
router.put("/:id", updateHabit);
router.get("/logs", protect, async (req, res) => {

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", req.user)
    .eq("date", today);

  if (error) return res.status(400).json(error);

  res.json(data);
});

export default router;