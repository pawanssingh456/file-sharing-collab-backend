import mongoose from "mongoose";

import { IDocument } from "../interfaces/Document";

const DocumentSchema = new mongoose.Schema<IDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, default: "" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default DocumentSchema