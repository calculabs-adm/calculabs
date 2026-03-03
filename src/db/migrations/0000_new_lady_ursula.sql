CREATE TABLE `calculators` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer NOT NULL,
	`subcategory_id` integer,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`introduction` text NOT NULL,
	`formula` text NOT NULL,
	`formula_display` text,
	`variables` text NOT NULL,
	`steps` text,
	`example` text,
	`applications` text,
	`faqs` text,
	`related_slugs` text,
	`keywords` text,
	`meta_title` text NOT NULL,
	`meta_description` text NOT NULL,
	`complexity` text DEFAULT 'basico' NOT NULL,
	`monetization_type` text DEFAULT 'ads',
	`author_name` text,
	`author_bio` text,
	`sources` text,
	`updated_at` integer,
	`created_at` integer,
	`is_active` integer DEFAULT true,
	`view_count` integer DEFAULT 0,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `calculators_slug_unique` ON `calculators` (`slug`);--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`icon` text,
	`color` text,
	`order` integer DEFAULT 0,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE TABLE `subcategories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`order` integer DEFAULT 0,
	`created_at` integer,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
