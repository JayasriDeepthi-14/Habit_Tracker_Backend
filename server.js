import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});