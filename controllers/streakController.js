import supabase from "../config/db.js";
import dayjs from "dayjs";

// Calculate streak for one user
const calculateStreak = (logs) => {
  let streak = 0;
  let today = dayjs().startOf("day");

  const dates = logs.map(l => dayjs(l.date).format("YYYY-MM-DD"));

  while (dates.includes(today.format("YYYY-MM-DD"))) {
    streak++;
    today = today.subtract(1, "day");
  }

  return streak;
};

// Get streak for logged in user
export const getUserStreak = async (req, res) => {

  const { data } = await supabase
    .from("habit_logs")
    .select("date")
    .eq("user_id", req.user)
    .eq("status", "completed");

  const streak = calculateStreak(data || []);

  res.json({ streak });
};

// Leaderboard
export const getLeaderboard = async (req, res) => {

  const { data: users } = await supabase
    .from("habit_users")
    .select("id, name");

  let leaderboard = [];

  for (let user of users) {

    const { data: logs } = await supabase
      .from("habit_logs")
      .select("date")
      .eq("user_id", user.id)
      .eq("status", "completed");

    const streak = calculateStreak(logs || []);

    leaderboard.push({
      name: user.name,
      streak
    });
  }

  leaderboard.sort((a, b) => b.streak - a.streak);

  res.json(leaderboard);
};