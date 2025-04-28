// services/FileService.ts
import File from "../models/File";
import jwt from "jsonwebtoken";

class FileService {
  async uploadFile(fileData: any, token: string): Promise<any> {
    const decoded = this.verifyToken(token);
    const file = new File({
      filename: fileData.originalname,
      path: fileData.path,
      size: fileData.size,
      owner: decoded.id,
    });
    return await file.save();
  }

  async getUserFiles(token: string): Promise<any[]> {
    const decoded = this.verifyToken(token);
    return await File.find({ owner: decoded.id });
  }

  private verifyToken(token: string): { id: string } {
    if (!token) throw new Error("Unauthorized");
    return jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  }
}

export default FileService;