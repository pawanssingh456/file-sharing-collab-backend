import { Server } from "socket.io";

export function setupDocumentHandlers(io: Server) {
  io.on("connection", (socket) => {
    const userId = (socket as any).userId;
    console.log("User connected:", userId);

    // Document collaboration handlers
    socket.on("join-document", (documentId: string) => {
      socket.join(documentId);
      console.log(`User ${userId} joined document ${documentId}`);
    });

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