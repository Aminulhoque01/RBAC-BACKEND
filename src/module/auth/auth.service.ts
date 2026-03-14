import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { UserModel } from "../user/user.model"
 

const loginUser = async(
 email:string,
 password:string
)=>{

 const user = await UserModel.findOne({email})

 if(!user){
  throw new Error("User not found")
 }

 const match = await bcrypt.compare(
  password,
  user.password
 )

 if(!match){
  throw new Error("Password incorrect")
 }

 const payload = {
  id:user._id
 }

 const token = jwt.sign(
  payload,
  process.env.JWT_SECRET as string,
  {expiresIn:"15m"}
 )

 return token
}

export const AuthService = {
 loginUser
}
