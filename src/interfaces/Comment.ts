import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
  text: string;
  document: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}