import { Request, Response } from "express"
import { PermissionService } from "./permission.service"
 

const createPermission = async(
 req:Request,
 res:Response
)=>{

 const result = await PermissionService.createPermission(
  req.body
 )

 res.json({
  success:true,
  data:result
 })

}

const getPermissions = async(
 req:Request,
 res:Response
)=>{

 const result = await PermissionService.getPermissions()

 res.json({
  success:true,
  data:result
 })

}

export const PermissionController = {
 createPermission,
 getPermissions
}
