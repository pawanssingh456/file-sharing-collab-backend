import mongoose from "mongoose";

import DocumentSchema from "../schemas/Document"
import { IDocument } from "../interfaces/Document"

export default mongoose.model<IDocument>("Document", DocumentSchema);