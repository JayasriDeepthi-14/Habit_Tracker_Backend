import supabase from "../config/db.js";
import dayjs from "dayjs";

// add
export const addHabit = async (req, res) => {
  const { title, category, priority } = req.body;

  const { data, error } = await supabase
    .from("habits")
    .insert([{
      user_id: req.user,
      title,
      category,
      priority,
    }]);

  if (error) return res.status(400).json(error);

  res.json(data);
};

// get
export const getHabits = async (req, res) => {
  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", req.user);

  if (error) return res.status(400).json(error);

  res.json(data);
};

// track
export const trackHabit = async (req, res) => {
  const { habit_id, status } = req.body;

  const today = dayjs().format("YYYY-MM-DD");

  // Check if already tracked today
  const { data: existing, error: checkError } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("habit_id", habit_id)
    .eq("date", today);

  if (checkError) return res.status(400).json(checkError);

  if (existing.length > 0) {
    return res.status(400).json({ msg: "Already tracked today" });
  }

  const { error } = await supabase
    .from("habit_logs")
    .insert([{
      habit_id,
      status,
      date: today
    }]);

  if (error) return res.status(400).json(error);

  res.json({ msg: "Tracked Successfully" });
};

// delete
export const deleteHabit = async (req, res) => {
  const { error } = await supabase
    .from("habits")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(400).json(error);

  res.json({ msg: "Deleted" });
};