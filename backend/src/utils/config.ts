import { config } from "dotenv";

config({
  path: ".env",
});

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 4000,
} as const;
