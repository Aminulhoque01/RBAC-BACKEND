import mongoose,{Schema} from "mongoose"
import { IPermission } from "./permission.interface"

const permissionSchema = new Schema<IPermission>({
 name:{type:String,required:true,unique:true},
 description:String
})

export const PermissionModel =
mongoose.model<IPermission>("Permission",permissionSchema)