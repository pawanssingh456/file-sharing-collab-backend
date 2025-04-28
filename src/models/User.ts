import mongoose from "mongoose";

import UserSchema from "../schemas/User"
import { IUser } from "../interfaces/User"

export default mongoose.model<IUser>("User", UserSchema);