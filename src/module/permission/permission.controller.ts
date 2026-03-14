import { Request, Response } from "express"
import { getSingleUserPermissions, PermissionService, updateUserPermissions } from "./permission.service"
 

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


// Get permissions for a specific user
export const getPermissionsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const permissions = await getSingleUserPermissions(userId as string)
  res.json({ success: true, data: permissions })
}

// Update permissions (toggle) for a user
export const setPermissionsForUser = async (req: Request, res: Response) => {
  const actorId = req.user!.id
  const { userId } = req.params
  const { permissions } = req.body // array of permission IDs

  const updatedUser = await updateUserPermissions(actorId, userId as string, permissions)
  res.json({ success: true, data: updatedUser })
}

export const PermissionController = {
 createPermission,
 getPermissions
}
