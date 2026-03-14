import mongoose, { Schema } from "mongoose"
import { IRole } from "./role.interface"

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["Admin", "Manager", "Agent", "Customer"]
  },
  permissions:[
  {
   type:Schema.Types.ObjectId,
   ref:"Permission"
  }
 ]
})

export const RoleModel = mongoose.model<IRole>("Role", roleSchema)
