import express from "express";
import { products } from "../db/schema.js";
import { db } from "../config/db.js";

const router = express.Router();
router.get("/", async (req, res) => {
  const queryResult = await db.select().from(products);
  res.send(queryResult);
});

export default router;
