import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import path from "path";

// Use Turso DB in production (Vercel), local SQLite in development
const dbUrl = process.env.TURSO_DATABASE_URL;

let client;

if (dbUrl) {
  // Production: Use Turso DB (libsql remote)
  client = createClient({
    url: dbUrl,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
} else {
  // Development: Use local SQLite file
  const dbPath = path.join(process.cwd(), "portal-calculo.db");
  client = createClient({
    url: `file:${dbPath}`,
  });
}

export const db = drizzle(client, { schema });
