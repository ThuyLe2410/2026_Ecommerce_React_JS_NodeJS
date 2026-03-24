import express from "express";
import { deliveryOptions, orders, products, cart } from "../db/schema.js";
import { db } from "../config/db.js";
import { desc, eq } from "drizzle-orm";
import { requireAuth } from "./auth.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const sortedOrders = await db
    .select()
    .from(orders).where(eq(orders.userId, userId))
    .orderBy(desc(orders.orderTimeMs));

  const queryResult = await Promise.all(
    sortedOrders.map(async (order) => {
      const orderProducts = await Promise.all(
        (order.products || []).map(async (product) => {
          const productDetails = await db
            .select()
            .from(products)
            .where(eq(products.id, product.productId));
          const details = productDetails[0];
          if (!details) {
            return {
              ...product,
              image: null,
              keywords: [],
              name: "Unknown product",
              priceCents: 0,
              rating: null,
            };
          }
          return {
            ...product,
            image: details.image,
            keywords: details.keywords,
            name: details.name,
            priceCents: details.priceCents,
            rating: details.rating,
          };
        }),
      );
      return { ...order, products: orderProducts };
    }),
  );

  res.send(queryResult);
});



router.post("/",requireAuth, async(req, res) => {
  const userId = req.user.id;
  console.log('userId', userId)
  const cartItems = await db.select().from(cart).where(eq(cart.userId, userId));
  if (cartItems.length===0) {
    return res.send('the cart is empty')
  }
  let totalCostCents = 0
  const cart_products = await Promise.all(
    cartItems.map(async (cartItem) => {
      const product = await db.select().from(products).where(eq(products.id, cartItem.productId));
      const deliveryOption = await db.select().from(deliveryOptions).where(eq(deliveryOptions.id, cartItem.deliveryOptionId))
      const productCost = product[0].priceCents * cartItem.quantity;
      const shipping = deliveryOption[0].priceCents;
      totalCostCents += productCost + shipping;
      const estimatedDeliveryTimeMs = Date.now() + deliveryOption[0].deliveryDays * 24 * 60 * 60 * 1000;
      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        estimatedDeliveryTimeMs:estimatedDeliveryTimeMs
      }
    })
  )
  totalCostCents = Math.round(totalCostCents * 1.1)
  await db.insert(orders).values({userId:userId,orderTimeMs:Date.now(), totalCostCents, products: cart_products});
  await db.delete(cart).where(eq(cart.userId, userId));
  res.send('inserted order successfully!')
})

router.get("/:orderId", async(req, res) => {
  const {orderId} = req.params;
  let orderRow = await db.select().from(orders).where(eq(orders.id, orderId));
  if (orderRow.length === 0) {
    return res.status(401).json({error: 'Order not found'})
  }
  let order = orderRow[0]
  const orderProducts = await Promise.all((order.products || []).map(async(product) => {
    const productDetails = await db.select().from(products).where(eq(products.id, product.productId));
    return {
      ...product,
      product: productDetails[0] ?? null
    }
  }))

  order = { ...order, products:orderProducts}
  res.send(order)
})


export default router;
