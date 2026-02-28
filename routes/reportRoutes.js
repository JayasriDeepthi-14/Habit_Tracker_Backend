import express from "express";
import { protect } from "../middleware/auth.js";
import { getReports } from "../controllers/reportController.js";

const router = express.Router();

router.use(protect);

router.get("/", getReports);

export default router;