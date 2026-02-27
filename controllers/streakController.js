import dayjs from "dayjs";
import { getUserHabitLogs } from "../models/habitLogModel.js";

export const getStreak = async (req, res) => {

  const { data } = await getUserHabitLogs(req.user);

  const logs = data.filter(l => l.status === "completed");

  let streak = 0;
  let today = dayjs();

  while (true) {
    const found = logs.find(
      l => dayjs(l.date).format("YYYY-MM-DD") === today.format("YYYY-MM-DD")
    );

    if (found) {
      streak++;
      today = today.subtract(1, "day");
    } else {
      break;
    }
  }

  res.json({ streak });
};