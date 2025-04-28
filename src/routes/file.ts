// routes/fileRoutes.ts
import express from "express";
import { upload } from "../middleware/upload";
import FileService from "../services/FileService";
import FileController from "../controllers/FileController";

const router = express.Router();
const fileService = new FileService();
const fileController = new FileController(fileService);

router.post("/upload", upload.single("file"), fileController.uploadFile.bind(fileController));
router.get("/", fileController.getUserFiles.bind(fileController));

export default router;