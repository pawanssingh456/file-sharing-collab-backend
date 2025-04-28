// src/services/AuthService.ts
import jwt from "jsonwebtoken";
import User from "../models/User";

class AuthService {
  async register(email: string, password: string, name: string) {
    const user = new User({ email, password, name });
    await user.save();
    const token = this.generateToken(user._id as string);
    return { token };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid credentials");
    }
    const token = this.generateToken(user._id as string);
    return { token };
  }

  async verifyToken(token: string): Promise<{ id: string; }> {
    if (!token) throw new Error("Unauthorized");
    return jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  }

  private generateToken(userId: string) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
  }
}

export default AuthService;