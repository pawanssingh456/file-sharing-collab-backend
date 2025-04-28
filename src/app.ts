import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import { initializeSocket } from "./socket";

import dbConnection from "./configrations/db";

import AuthRoutes from "./routes/auth";
import FileRoutes from "./routes/file";
import CommentRoutes from "./routes/comment";
import DocumentRoutes from "./routes/document";

dotenv.config();
dbConnection.connect();

const app = express();
const PORT = process.env.PORT || 8000;

const authRoutes = new AuthRoutes();
const fileRoutes = new FileRoutes()
const commentRoutes = new CommentRoutes()
const documentRoutes = new DocumentRoutes()

// Middleware
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes.router);
app.use("/files", fileRoutes.router);
app.use("/comments", commentRoutes.router)
app.use("/documents", documentRoutes.router)

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// Set up Redis adapter and Socket.IO handlers
initializeSocket(io);

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});