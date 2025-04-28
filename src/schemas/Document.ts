import mongoose from "mongoose";

import { IDocument } from "../interfaces/Document";

const DocumentSchema = new mongoose.Schema<IDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, default: "" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    docId: { type: String, required: true, unique: true },
    changes: { type: [Buffer], required: true },
    snapshot: Buffer,
  },
  { timestamps: true }
);

export default DocumentSchema