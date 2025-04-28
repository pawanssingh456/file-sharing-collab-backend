import express from "express";
import AuthService from "../services/AuthService";
import DocumentController from "../controllers/DocumentController";
import DocumentService from "../services/DocumentService";

export default class DocumentRoutes {
  public router: express.Router;
  private documentController: DocumentController;

  constructor() {
    this.router = express.Router();
    const authService = new AuthService();
    const documentService = new DocumentService();
    this.documentController = new DocumentController(documentService, authService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Create new document
    this.router.post(
      "/",
      this.documentController.createDocument.bind(this.documentController)
    );

    // Save document version
    this.router.post(
      "/:id/versions",
      this.documentController.saveDocumentVersion.bind(this.documentController)
    );
  }
}