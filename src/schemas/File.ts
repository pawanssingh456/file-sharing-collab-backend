import mongoose from "mongoose";

import { IFile } from "../interfaces/File";

const FileSchema = new mongoose.Schema<IFile>({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

export default FileSchema