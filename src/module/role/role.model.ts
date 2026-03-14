import mongoose,{Schema} from "mongoose"
import { IRole } from "./role.interface"

const roleSchema = new Schema<IRole>({
 name:{type:String,required:true,unique:true},
 description:String
})

export const RoleModel = mongoose.model<IRole>("Role",roleSchema)