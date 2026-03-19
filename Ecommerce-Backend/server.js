import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import cart from "./routes/cart.js";
import deliveryOptions from "./routes/deliveryOptions.js";
import paymentSummary from "./routes/paymentSummary.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: "http://localhost:5175", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/cart", cart);
app.use("/api/deliveryOptions", deliveryOptions);
app.use("/api/paymentSummary", paymentSummary);
app.use("/api/auth", authRoutes)

// Start server with database connection test

const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
