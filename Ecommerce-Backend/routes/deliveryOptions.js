import express from "express";
import { deliveryOptions } from "../db/schema.js";
import { db } from "../config/db.js";

const route = express.Router();
route.get("/", async (req, res) => {
  let query_deliveryOptions = await db.select().from(deliveryOptions);
  const queryResult = query_deliveryOptions.map((option) => {
    const deliveryTimeMs =
      Date.now() + option.deliveryDays * 24 * 60 * 60 * 1000;
    return {
      ...option,
      estimatedDeliveryTimeMs: deliveryTimeMs,
    };
  });

  res.send(queryResult);
});

export default route;
