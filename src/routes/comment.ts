import express from "express";
import AuthService from "../services/AuthService";
import CommentService from "../services/CommentService";
import CommentController from "../controllers/CommentController";

export default class CommentRoutes {
  public router: express.Router;
  private commentController: CommentController;

  constructor() {
    this.router = express.Router();
    const authService = new AuthService();
    const commentService = new CommentService();
    this.commentController = new CommentController(commentService, authService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/:id",
      this.commentController.addComment.bind(this.commentController)
    );
  }
}