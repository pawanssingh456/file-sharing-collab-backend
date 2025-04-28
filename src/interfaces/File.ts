import mongoose, { Document } from "mongoose";

export interface IFile extends Document {
  filename: string
  path: string
  size: number
  owner: mongoose.Types.ObjectId;
}