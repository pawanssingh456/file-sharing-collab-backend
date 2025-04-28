// src/routes/authRoutes.ts
import express from "express";
import AuthService from "../services/AuthService";
import AuthController from "../controllers/AuthController";

const router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));

export default router;