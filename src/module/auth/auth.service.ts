import { UserModel } from "../user/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { TokenBlacklist } from "./tokenBlacklist.model"
 

const loginUser = async (email:string, password:string) => {
  const user = await UserModel.findOne({email})
  if(!user) throw new Error("User not found")
  if(user.status !== "active") throw new Error("User is not active")

  const match = await bcrypt.compare(password, user.password)
  if(!match) throw new Error("Password incorrect")

  const payload = { id: user._id }

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn:"15m" })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn:"7d" })

  return { accessToken, refreshToken }
}

const logoutUser = async (token:string) => {
  const decoded:any = jwt.decode(token)
  const expiresAt = decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 15*60*1000)
  await TokenBlacklist.create({ token, expiresAt })
}

const refreshToken = async (token:string) => {
  const blacklisted = await TokenBlacklist.findOne({ token })
  if(blacklisted) throw new Error("Token revoked")

  const decoded:any = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
  const payload = { id: decoded.id }
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn:"15m" })

  return accessToken
}

export const AuthService = { loginUser, logoutUser, refreshToken }
