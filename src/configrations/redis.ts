import { createClient } from "redis";

export async function initializeRedis() {
  const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
  });

  redisClient.on("error", (err) => console.error("Redis Client Error", err));

  await redisClient.connect();
  console.log("Redis client connected");

  return redisClient;
}