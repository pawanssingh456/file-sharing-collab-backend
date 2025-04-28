import mongoose from "mongoose";

import CommentSchema from "../schemas/Comment"
import { IComment } from "../interfaces/Comment"

export default mongoose.model<IComment>("Comment", CommentSchema);