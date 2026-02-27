import supabase from "../config/db.js";

export const createUser = async (userData) => {
  return await supabase
    .from("habit_users")
    .insert([userData]);
};

export const findUserByEmail = async (email) => {
  return await supabase
    .from("habit_users")
    .select("*")
    .eq("email", email)
    .single();
};