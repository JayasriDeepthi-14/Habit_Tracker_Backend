import supabase from "../config/db.js";

export const createHabitLog = async (logData) => {
  return await supabase
    .from("habit_logs")
    .insert([logData]);
};

export const getUserHabitLogs = async (userId) => {
  return await supabase
    .from("habit_logs")
    .select(`
      *,
      habits!inner(user_id)
    `)
    .eq("habits.user_id", userId);
};