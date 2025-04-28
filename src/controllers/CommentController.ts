import { Request, Response } from "express";
import CommentService from "../services/CommentService";
import AuthService from "../services/AuthService";

class CommentController {
  constructor(private commentService: CommentService, private authService: AuthService) { }

  async addComment(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "Unauthorized" });

      const decoded = await this.authService.verifyToken(token);
      const comment = await this.commentService.addComment(
        req.body.text,
        req.params.id,
        decoded.id
      );
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default CommentController