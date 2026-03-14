import { Request,Response } from "express"
import { UserService } from "./user.service"
 

const createUser = async(
 req:Request,
 res:Response
)=>{

 const result = await UserService.createUser(req.body)

 res.json({
  success:true,
  data:result
 })

}

const getUsers = async(
 req:Request,
 res:Response
)=>{

 const result = await UserService.getUsers()

 res.json({
  success:true,
  data:result
 })

}

export const UserController = {
 createUser,
 getUsers
}
