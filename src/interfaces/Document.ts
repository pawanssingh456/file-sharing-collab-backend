import mongoose, { Document } from "mongoose";

export interface IDocument extends Document {
  title: string;
  content: string;
  owner: mongoose.Types.ObjectId;
  collaborators: mongoose.Types.ObjectId[];
}