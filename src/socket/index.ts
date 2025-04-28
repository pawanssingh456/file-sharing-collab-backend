import { Server } from "socket.io";
import { setupRedisAdapter } from "./redis-adapter";
import { setupAuthentication } from "./authentication";
import { setupDocumentHandlers } from "./document-handler";

export async function initializeSocket(io: Server) {
  // Set up Redis adapter for scaling
  await setupRedisAdapter(io);

  // Configure authentication middleware
  setupAuthentication(io);

  // Set up document collaboration handlers
  setupDocumentHandlers(io);
}