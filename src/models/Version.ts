import mongoose from "mongoose";

import VersionSchema from "../schemas/Version"
import { IVersion } from "../interfaces/Version"

export default mongoose.model<IVersion>("Version", VersionSchema);