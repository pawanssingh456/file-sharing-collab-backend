import express from "express";
import { upload } from "../middleware/upload";
import FileService from "../services/FileService";
import FileController from "../controllers/FileController";

export default class FileRoutes {
  public router: express.Router;
  private fileController: FileController;

  constructor() {
    this.router = express.Router();
    const fileService = new FileService();
    this.fileController = new FileController(fileService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/upload",
      upload.single("file"),
      this.fileController.uploadFile.bind(this.fileController)
    );
    this.router.get(
      "/",
      this.fileController.getUserFiles.bind(this.fileController)
    );
  }
}