import { Request,Response } from "express"
import { AuthService } from "./auth.service"

const login = async(
 req:Request,
 res:Response
)=>{

 const {email,password} = req.body

 const token = await AuthService.loginUser(
  email,
  password
 )

 res.json({
  success:true,
  token
 })

}

export const AuthController = {
 login
}
