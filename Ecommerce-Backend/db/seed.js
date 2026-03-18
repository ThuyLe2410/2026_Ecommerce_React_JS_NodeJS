import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from 'dotenv'
import { defaultProducts } from "../defaultData/defaultProducts.js";
import { products, orders, deliveryOptions, cart } from "./schema.js";
import { defaultOrders } from "../defaultData/defaultOrders.js";
import { defaultCart } from "../defaultData/defaultCart.js";
import { defaultDeliveryOptions } from "../defaultData/defaultDeliveryOptions.js";

dotenv.config()

const client = postgres(process.env.DATABASE_URL)
const db = drizzle(client)

async function seed() {
    try {
        console.log('starting db seeding...')
        console.log('insert default products')
        await db.insert(products).values(defaultProducts).onConflictDoNothing()
        console.log('inserted default products successfully!')
        console.log('insert default orders')
        await db.insert(orders).values(defaultOrders).onConflictDoNothing()
        console.log('inserted default orders successfully!')
        console.log('insert default cart')
        await db.insert(cart).values(defaultCart).onConflictDoNothing()
        console.log('inserted default cart successfully!')
        console.log('insert default deliveryOptions')
        await db.insert(deliveryOptions).values(defaultDeliveryOptions).onConflictDoNothing()
        console.log('inserted delivery options successfully!')
    } catch (error) {
        console.error('error seeding db', error)
    } finally {
        await client.end()
    }
}

seed()
