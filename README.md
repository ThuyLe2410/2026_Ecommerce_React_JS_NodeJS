# 2026 Ecommerce React

Full-stack ecommerce app with a React frontend and a Node/Express + Drizzle backend.

## Project Structure

```
Ecommerce-Frontend/   # React app (Vite)
Ecommerce-Backend/    # Express API + Drizzle + PostgreSQL (Neon)
```

## Requirements

- Node.js (>= 18 recommended)
- npm
- PostgreSQL (Neon or local)

## Backend Setup

1. Install dependencies:
   ```bash
   cd Ecommerce-Backend
   npm install
   ```

2. Create `.env` in `Ecommerce-Backend`:
   ```bash
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require
   ```

3. Run migrations:
   ```bash
   npx drizzle-kit migrate
   ```

4. (Optional) Seed data:
   ```bash
   node db/seed.js
   ```

5. Start the server:
   ```bash
   npm run dev
   ```
   API runs on `http://localhost:3001`

## Frontend Setup

1. Install dependencies:
   ```bash
   cd Ecommerce-Frontend
   npm install
   ```

2. Start the app:
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173` (default Vite port)

## Scripts

### Backend
```bash
cd Ecommerce-Backend
npm run dev      # start backend with nodemon
npm run start    # start backend with node
```

### Frontend
```bash
cd Ecommerce-Frontend
npm run dev      # start frontend (Vite)
npm run build    # build frontend
npm run preview  # preview production build
npm run lint     # run ESLint
```

### Migrations / Seed
```bash
cd Ecommerce-Backend
npx drizzle-kit generate
npx drizzle-kit migrate
node db/seed.js
```

## API Endpoints (sample)

- `GET /api/products`
- `GET /api/cart`
- `POST /api/cart`
- `PATCH /api/cart/:productId`
- `PUT /api/cart/:productId/delivery-option`
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/deliveryOptions`
- `GET /api/paymentSummary`

## Notes

- The backend uses Drizzle ORM with PostgreSQL.
- `products` and `orders` store JSON fields (e.g. product list in an order).
- Image assets are served from `/images/...` in the frontend `public` folder.

## Troubleshooting

- If images don't show on non-root routes, use absolute paths like `/images/logo.png`.
- If migrations fail due to UUID type changes, apply the SQL migration in Neon first.
