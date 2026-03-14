import { Request,Response } from "express"
import { loginUser, refreshTokenService, registerUser } from "./auth.service"


export const register = async (req: Request, res: Response) => {
  try {

    const result = await registerUser(req.body)

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result
    })

  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const login = async(req:Request,res:Response)=>{

 const {email,password} = req.body

 const result = await loginUser(email,password)

 res.cookie("refreshToken",result.refreshToken,{
  httpOnly:true,
  secure:false,
  sameSite:"strict"
 })

 res.json({
  success:true,
  accessToken:result.accessToken
 })

}


export const refreshToken = async(req:Request,res:Response)=>{

 const token = req.cookies.refreshToken

 if(!token){
  return res.status(401).json({
   message:"No refresh token"
  })
 }

 const accessToken = refreshTokenService(token)

 res.json({
  accessToken
 })

}