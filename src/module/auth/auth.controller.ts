import { Request, Response } from "express"
import { AuthService } from "./auth.service"

export const login = async (req:Request,res:Response) => {
  const { email, password } = req.body
  try {
    const tokens = await AuthService.loginUser(email, password)
    // Send refresh token as HttpOnly cookie
    res.cookie("refreshToken", tokens.refreshToken, 
      { httpOnly:true, secure:true, sameSite:"strict", maxAge:7*24*60*60*1000 }
    )
    res.json({ success:true, accessToken: tokens.accessToken })
  } catch(err:any) {
    res.status(400).json({ success:false, message: err.message })
  }
}

export const logout = async (req:Request,res:Response) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.refreshToken
  if(!token) return res.status(400).json({ success:false, message:"Token required" })
  await AuthService.logoutUser(token)
  res.clearCookie("refreshToken")
  res.json({ success:true, message:"Logged out" })
}

export const refresh = async (req:Request,res:Response) => {
  const token = req.cookies.refreshToken
  if(!token) return res.status(400).json({ success:false, message:"Refresh token required" })
  try {
    const accessToken = await AuthService.refreshToken(token)
    res.json({ success:true, accessToken })
  } catch(err:any) {
    res.status(401).json({ success:false, message: err.message })
  }
}
