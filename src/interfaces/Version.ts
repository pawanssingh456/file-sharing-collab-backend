
import mongoose, { Document } from "mongoose";

export interface IVersion extends Document {
  content: string;
  document: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}