import jwt from "jsonwebtoken"
import { config } from "../config"
 

export const createAccessToken = (payload:any) => {

 return jwt.sign(
  payload,
  config.jwt_access_secret as string,
  { expiresIn: "7d"}
 )

}

export const createRefreshToken = (payload:any) => {

 return jwt.sign(
  payload,
  config.jwt_refresh_secret as string,
  { expiresIn: "15m" }
 )

}