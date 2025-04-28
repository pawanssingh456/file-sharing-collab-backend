import mongoose from "mongoose";

import { IVersion } from "../interfaces/Version";

const VersionSchema = new mongoose.Schema<IVersion>(
  {
    content: { type: String, required: true },
    document: { type: mongoose.Schema.Types.ObjectId, ref: "Document", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
)

export default VersionSchema