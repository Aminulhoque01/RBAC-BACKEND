import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"
import { IUser } from "./user.interface"

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: "Role" },
  customPermissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
  status: { type: String, enum: ["active","suspended","banned"], default: "active" }
}, { timestamps: true })




export const UserModel = model<IUser>("User", userSchema)
