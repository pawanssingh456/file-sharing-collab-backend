import mongoose from "mongoose";

import FileSchema from "../schemas/File"
import { IFile } from "../interfaces/File"

export default mongoose.model<IFile>("File", FileSchema);