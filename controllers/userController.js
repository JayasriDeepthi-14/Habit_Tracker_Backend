import supabase from "../config/db.js";

export const getUserStats = async (req, res) => {

  const userId = req.user;

  // Get total completed habits
  const { data: completed } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "completed");

  // Get user info
  const { data: user } = await supabase
    .from("habit_users")
    .select("name, email, created_at")
    .eq("id", userId)
    .single();

  res.json({
    name: user.name,
    email: user.email,
    joined: user.created_at,
    totalCompleted: completed.length
  });
};