import { createHabitLog, getUserHabitLogs } from "../models/habitLogModel.js";

export const trackHabit = async (req, res) => {

  const { habit_id, status } = req.body;

  const { error } = await createHabitLog({
    habit_id,
    status,
    date: new Date()
  });

  if (error) return res.status(400).json(error);

  res.json({ msg: "Tracked Successfully" });
};

export const getLogs = async (req, res) => {

  const { data, error } = await getUserHabitLogs(req.user);

  if (error) return res.status(400).json(error);

  res.json(data);
};