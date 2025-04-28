import { Request, Response } from "express";
import DocumentService from "../services/DocumentService";
import AuthService from "../services/AuthService";

class DocumentController {
  constructor(private documentService: DocumentService, private authService: AuthService) { }

  async createDocument(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "Unauthorized" });

      const decoded = await this.authService.verifyToken(token);
      const doc = await this.documentService.createDocument(req.body, decoded.id);
      res.status(201).json(doc);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async saveDocumentVersion(req: Request, res: Response): Promise<any> {
    try {
      const version = await this.documentService.saveDocumentVersion(req.params.id);
      res.status(201).json(version);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default DocumentController