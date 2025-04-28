import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import dbConnection from "./db";

import authRouter from "./routes/auth";
import fileRouter from "./routes/file";

dotenv.config();
dbConnection.connect();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/files", fileRouter);
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("File Sharing Collab Backend");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});