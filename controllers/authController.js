import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import { createUser, findUserByEmail } from "../models/userModel.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const { error } = await createUser({
    name,
    email,
    password: hash,
  });

  if (error) return res.status(400).json(error);

  res.json({ msg: "Registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data } = await findUserByEmail(email);

  if (!data)
    return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, data.password);

  if (!match)
    return res.status(400).json({ msg: "Wrong password" });

  res.json({
    token: generateToken(data.id),
    user: data,
  });
};