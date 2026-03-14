import jwt from "jsonwebtoken"
import { config } from "../config"

export const authMiddleware = (req:any,res:any,next:any)=>{

 const token = req.headers.authorization?.split(" ")[1]

 if(!token){
  return res.status(401).json({message:"Unauthorized"})
 }

 const decoded = jwt.verify(
  token,
  config.jwt_access_secret as string
 )

 req.user = decoded

 next()
}