import express from "express";
import { cart, products } from "../db/schema.js";
import { db } from "../config/db.js";
import { eq, asc, and } from "drizzle-orm";
import { requireAuth } from "./auth.js";

const route = express.Router();
route.get("/", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const cartItems = await db
    .select()
    .from(cart)
    .where(eq(cart.userId, userId))
    .orderBy(asc(cart.createdAt), asc(cart.productId));
  const queryResult = await Promise.all(
    cartItems.map(async (item) => {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, item.productId));
      if (product.length === 0) {
        return {...item, image: null, keywords:[], name: "Unknown", priceCents: 0};
      }
      return {
        ...item,
        image: product[0].image,
        keywords: product[0].keywords,
        name: product[0].name,
        priceCents: product[0].priceCents,
      };
    }),
  );

  res.send(queryResult);
});

route.patch("/:productId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { deliveryOptionId, quantity } = req.body;
  const existingCart_byProductId = await db
    .select()
    .from(cart)
    .where(and(eq(cart.userId, userId), eq(cart.productId, productId)));
  if (existingCart_byProductId.length > 0) {
    await db
      .update(cart)
      .set({
        ...(quantity !== undefined || quantity === 0 ? { quantity } : {}),
        ...(deliveryOptionId !== undefined ? { deliveryOptionId } : {}),
        updatedAt: new Date(),
      })
      .where(and(eq(cart.productId, productId), eq(cart.userId, userId)));
  } else {
    await db.insert(cart).values({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1",
      userId: userId,
    });
  }
  res.send("updated successfully!");
});

route.post("/", requireAuth, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, productId));
  if (product.length === 0) {
    return res.status(400).json({ error: "Product not found" });
  }

  if (typeof quantity !== "number" || quantity < 1 || quantity > 10) {
    return res
      .status(400)
      .json({ error: "Quantity must be a number between 1 and 10" });
  }

  let cartItem = await db
    .select()
    .from(cart)
    .where(and(eq(cart.productId, productId), eq(cart.userId, userId)));
  if (cartItem.length !== 0) {
    await db
      .update(cart)
      .set({ quantity: quantity + cartItem[0].quantity })
      .where(and(eq(cart.productId, productId), eq(cart.userId, userId)));
  } else {
    await db.insert(cart).values({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1",
      userId: userId,
    });
  }
  res.send("query");
});

route.delete("/:productId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  await db
    .delete(cart)
    .where(and(eq(cart.productId, productId), eq(cart.userId, userId)));
  res.send("delete successfully!");
});

export default route;
