import supabase from "../config/db.js";
import dayjs from "dayjs";

export const addHabit = async (req, res) => {
  const { title, category, priority } = req.body;

  const { data, error } = await supabase
    .from("habits")
    .insert([{
      user_id: req.user,
      title,
      category,
      priority,
      type: "custom"
    }])
    .select();

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const getHabits = async (req, res) => {
  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", req.user);

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const trackHabit = async (req, res) => {
  const { habit_id, status } = req.body;
  const today = dayjs().format("YYYY-MM-DD");

  const { data: existing } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("habit_id", habit_id)
    .eq("date", today);

  if (existing && existing.length > 0) {
    return res.status(400).json({ msg: "Already tracked today" });
  }

  const { error } = await supabase
    .from("habit_logs")
    .insert([{
      habit_id,
      status,
      date: today,
      user_id: req.user
    }]);

  if (error) return res.status(400).json(error);

  res.json({ msg: "Tracked" });
};

export const deleteHabit = async (req, res) => {
  await supabase
    .from("habits")
    .delete()
    .eq("id", req.params.id)
    .eq("user_id", req.user);

  res.json({ msg: "Deleted" });
};

export const updateHabit = async (req, res) => {
  const { title, category, priority } = req.body;

  await supabase
    .from("habits")
    .update({ title, category, priority })
    .eq("id", req.params.id)
    .eq("user_id", req.user);

  res.json({ msg: "Updated" });
};