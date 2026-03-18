CREATE TABLE "cart" (
	"productId" varchar(36) PRIMARY KEY NOT NULL,
	"quantity" integer,
	"deliveryOptionId" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deliveryOptions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"deliveryDays" integer,
	"priceCents" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderTimeMs" bigint,
	"totalCostCents" integer,
	"products" json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"image" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"rating" json NOT NULL,
	"price_cents" integer,
	"keywords" json NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
