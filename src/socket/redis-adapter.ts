import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { initializeRedis } from "../configrations/redis";

export async function setupRedisAdapter(io: Server) {
  const redisClient = await initializeRedis();
  io.adapter(createAdapter(redisClient, redisClient.duplicate()));
  console.log("Redis adapter configured for Socket.IO");
}