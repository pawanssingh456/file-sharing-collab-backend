// src/controllers/AuthController.ts
import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
  constructor(private authService: AuthService) { }

  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const result = await this.authService.register(email, password, name);
      res.status(201).json(result);
    } catch (error) {
      const err = error as Error & { code?: number };
      let errMessage = err.message

      if (err.code === 11000) {
        errMessage = "Email already exists. Please use a different email address."
      }

      res.status(400).json({ error: errMessage })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }
}

export default AuthController;