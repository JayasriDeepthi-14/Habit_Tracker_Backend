import supabase from "../config/db.js";
import dayjs from "dayjs";

export const getReports = async (req, res) => {

  const userId = req.user;

  // Total habits
  const { data: habits } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId);

  // All completed logs
  const { data: completed } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "completed");

  // Weekly data
  const today = dayjs();
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const date = today.subtract(i, "day").format("YYYY-MM-DD");

    const count = completed.filter(
      l => l.date === date
    ).length;

    last7Days.push({
      date,
      count
    });
  }

  // Category breakdown
  const categoryData = {};

  habits.forEach(h => {
    if (!categoryData[h.category]) {
      categoryData[h.category] = 0;
    }
  });

  completed.forEach(log => {
    const habit = habits.find(h => h.id === log.habit_id);
    if (habit) {
      categoryData[habit.category] += 1;
    }
  });

  res.json({
    totalHabits: habits.length,
    totalCompleted: completed.length,
    completionPercentage:
      habits.length === 0
        ? 0
        : Math.round((completed.length / habits.length) * 100),
    weekly: last7Days,
    categories: categoryData
  });
};