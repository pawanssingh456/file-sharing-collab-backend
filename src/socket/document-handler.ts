import Redis from 'ioredis';
import { Server } from "socket.io";

import Document from "../models/Document"

const redis = new Redis();

const trackPresence = async (docId: string, userId: string) => {
  await redis.hset(`doc:${docId}`, userId, Date.now());
  setTimeout(() => redis.hdel(`doc:${docId}`, userId), 5000); // Expire after 5s
};

export function setupDocumentHandlers(io: Server) {
  io.on("connection", (socket) => {
    const userId = (socket as any).userId;
    console.log("User connected:", userId);

    // Document collaboration handlers
    socket.on("join-document", async (documentId: string) => {
      socket.join(documentId);
      console.log(`User ${userId} joined document ${documentId}`);

      // Send existing document state
      const doc = await Document.findOne({ docId: documentId });
      if (doc) {
        socket.emit('init', doc.snapshot || doc.changes);
      }

      // Send presence update
      await trackPresence(documentId, userId);
      const users = await redis.hgetall(`doc:${documentId}`);
      io.to(documentId).emit('presence', Object.keys(users));

    });

    socket.on('changes', async ({ docId, changes }: { docId: string; changes: Uint8Array }) => {
      // Store changes in MongoDB
      await Document.updateOne(
        { docId },
        { $push: { changes: Buffer.from(changes) } },
        { upsert: true }
      );

      // Broadcast to other collaborators
      socket.to(docId).emit('changes', changes);
    });

    // Handle presence heartbeat
    const presenceInterval = setInterval(async () => {
      if (socket.rooms.size > 0) {
        const docId = Array.from(socket.rooms)[1]; // First room after socket ID
        await trackPresence(docId, userId);
      }
    }, 3000);

    socket.on("text-update", ({ documentId, content }: { documentId: string; content: string }) => {
      // Broadcast changes to all users in the room except sender
      socket.to(documentId).emit("text-update", content);
      console.log(`User ${userId} updated document ${documentId}`);
    });

    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`);
    });
  });
}