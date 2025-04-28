import mongoose from "mongoose";

import { IComment } from "../interfaces/Comment";

const CommentSchema = new mongoose.Schema<IComment>(
  {
    text: { type: String, required: true },
    document: { type: mongoose.Schema.Types.ObjectId, ref: "Document", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default CommentSchema