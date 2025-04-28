// src/routes/authRoutes.ts
import express from "express";
import AuthService from "../services/AuthService";
import AuthController from "../controllers/AuthController";

export default class AuthRoutes {
  public router: express.Router;
  private authController: AuthController;

  constructor() {
    this.router = express.Router();
    const authService = new AuthService();
    this.authController = new AuthController(authService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.authController.register.bind(this.authController));
    this.router.post("/login", this.authController.login.bind(this.authController));
  }
}