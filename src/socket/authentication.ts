import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export function setupAuthentication(io: Server) {
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      (socket as any).userId = decoded.id;
      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });
}