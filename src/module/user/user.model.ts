import mongoose, { Schema } from "mongoose"
import { IUser } from "./user.interface"

const userSchema = new Schema<IUser>(
{
 name:{type:String,required:true},
 email:{type:String,required:true,unique:true},
 password:{type:String,required:true},
 role:{type:Schema.Types.ObjectId,ref:"Role"},
 permissions:[{type:Schema.Types.ObjectId,ref:"Permission"}],
 status:{
  type:String,
  enum:["active","suspended","banned"],
  default:"active"
 }
},
{timestamps:true}
)

export const UserModel = mongoose.model<IUser>("User",userSchema)


 
 