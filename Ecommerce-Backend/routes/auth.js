import express from "express";
import { signInSchema, signUpSchema } from "./authSchemas.js";
import { users } from "../db/schema.js";
import { db } from "../config/db.js";
import { eq } from "drizzle-orm";
import { comparePasswords, hashPassword } from "./passwordHasher.js";
import jwt from "jsonwebtoken";

const router = express.Router();

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

router.post("/signUp", async (req, res) => {
  const parsed = signUpSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const { name, email, password } = parsed.data;
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    return res.status(400).json({ error: "Email already in use" });
  }
  const passwordHash = await hashPassword(password);
  console.log("passwordHash", passwordHash);
  const [user] = await db
    .insert(users)
    .values({ name, email, passwordHash })
    .returning({ id: users.id, email: users.email });
  const token = signToken({id: user.id, email: user.email})
  console.log("token", token);

  res.cookie("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  res.json({ id: user.id, email: user.email });
});

router.post("/signIn", async(req, res) => {
    const parsed = signInSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({error: "Invalid input"})
    }
    const {email, password} = parsed.data;
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
        return res.status(400).json({error: "Invalid email"});
    }
    const ok = await comparePasswords(password, user.passwordHash);
    if (!ok) return res.status(400).json({error: "Wrong password"});
    const token = signToken({id: user.id, email: user.email});
    res.cookie("auth_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000*60*60*24*7
    });
    res.json({id:user.id, email:user.email})
})

export default router;
