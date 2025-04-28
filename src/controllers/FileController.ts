// controllers/FileController.ts
import { Request, Response } from "express";
import FileService from "../services/FileService";

class FileController {
  constructor(private fileService: FileService) { }

  async uploadFile(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!req.file) throw new Error("No file uploaded");

      const file = await this.fileService.uploadFile(req.file, token!);
      res.status(201).json(file);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getUserFiles(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const files = await this.fileService.getUserFiles(token!);
      res.json(files);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default FileController;