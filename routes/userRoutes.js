import express from "express";
import { protect } from "../middleware/auth.js";
import { getUserStats } from "../controllers/userController.js";

const router = express.Router();

router.use(protect);

router.get("/stats", getUserStats);

export default router;