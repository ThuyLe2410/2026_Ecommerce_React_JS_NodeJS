import express from "express";
import { db } from "../config/db.js";
import { cart, deliveryOptions, products } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { requireAuth } from "./auth.js";

const route = express.Router();
route.get("/", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const cartItems = await db.select().from(cart).where(eq(cart.userId, userId));
  const orderAmount = await Promise.all(
    cartItems.map(async (cartItem) => {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, cartItem.productId));

      const delivery = await db
        .select()
        .from(deliveryOptions)
        .where(eq(deliveryOptions.id, cartItem.deliveryOptionId));
      if (!product[0] || !delivery[0]) {
        return null;
      }
      return {
        ...cartItem,
        priceCents: product[0].priceCents,
        deliveryCost: delivery[0].priceCents,
      };
    }),
  );
  let quantity = 0;
  let amount = 0;
  let shipping = 0;
  orderAmount.forEach((order) => {
    quantity += order.quantity;
    amount += order.quantity * order.priceCents;
    shipping += order.deliveryCost;
  });
  const totalCostBeforeTax = amount + shipping;
  const tax = Math.round(totalCostBeforeTax * 0.1);
  const totalOrder = totalCostBeforeTax + tax;

  res.json({ quantity, amount, shipping, totalCostBeforeTax, tax, totalOrder });
});
export default route;
