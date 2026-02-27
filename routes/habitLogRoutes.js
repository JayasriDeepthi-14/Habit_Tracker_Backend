import express from "express";
import { protect } from "../middleware/auth.js";
import { trackHabit, getLogs } from "../controllers/habitLogController.js";

const router = express.Router();

router.use(protect);

router.post("/track", trackHabit);
router.get("/logs", getLogs);

export default router;