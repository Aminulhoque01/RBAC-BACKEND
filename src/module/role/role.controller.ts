import { Request,Response } from "express"
import { RoleService } from "./role.service"

const createRole = async(
 req:Request,
 res:Response
)=>{

 const result = await RoleService.createRole(req.body)

 res.json({
  success:true,
  data:result
 })

}

const getRoles = async(
 req:Request,
 res:Response
)=>{

 const result = await RoleService.getRoles()

 res.json({
  success:true,
  data:result
 })

}

export const RoleController = {
 createRole,
 getRoles
}
