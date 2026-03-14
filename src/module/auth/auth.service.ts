import { UserModel } from "../user/user.model"
import { comparePassword, hashPassword } from "../../utils/hash"
import { createAccessToken, createRefreshToken } from "../../utils/jwt"
import { config } from "../../config"
import jwt from "jsonwebtoken"


export const registerUser = async (payload: any) => {

  const { name, email, password, role } = payload

  const hashedPassword = await hashPassword(password)

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role
  })

  return user
}

export const loginUser = async(email:string,password:string)=>{

 const user = await UserModel.findOne({email})

 if(!user){
  throw new Error("User not found")
 }

 const match = await comparePassword(password,user.password)

 if(!match){
  throw new Error("Password incorrect")
 }

 const payload = {
  id:user._id,
  role:user.role
 }

 const accessToken = createAccessToken(payload)
 const refreshToken = createRefreshToken(payload)

 return {
  accessToken,
  refreshToken
 }
}


export const refreshTokenService = (token:string)=>{

 const decoded:any = jwt.verify(
  token,
  config.jwt_refresh_secret as string
 )

 const payload = {
  id:decoded.id,
  role:decoded.role
 }

 const accessToken = createAccessToken(payload)

 return accessToken
}