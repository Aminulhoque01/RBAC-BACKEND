import { UserModel } from "../user/user.model"
import { PermissionModel } from "./permission.model"

 

const createPermission = async (payload:any)=>{

 return await PermissionModel.create(payload)

}

const getPermissions = async ()=>{

 return await PermissionModel.find()

}

export const getSingleUserPermissions = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .populate({
      path: "role",
      populate: { path: "permissions" }
    })
    .populate("customPermissions")

  const rolePermissions = (user?.role as any)?.permissions || []
  const customPermissions = user?.customPermissions || []

  // Merge unique permissions
  const resolvedPermissions = [
    ...rolePermissions.map((p: any) => p._id.toString()),
    ...customPermissions.map((p: any) => p._id.toString())
  ]

  return Array.from(new Set(resolvedPermissions))
}


export const updateUserPermissions = async (
  actorId: string,
  targetUserId: string,
  permissionIds: string[]
) => {
  // 1️⃣ Get actor's permissions (they cannot grant beyond this)
  const actorPermissions = await getSingleUserPermissions(actorId)

  // 2️⃣ Filter only allowed permissions
  const allowedPermissions = permissionIds.filter(pid => actorPermissions.includes(pid))

  // 3️⃣ Update target user's customPermissions
  const updatedUser = await UserModel.findByIdAndUpdate(
    targetUserId,
    { customPermissions: allowedPermissions },
    { new: true }
  ).populate("customPermissions")

  return updatedUser
}

export const PermissionService = {
 createPermission,
 getPermissions,
 getSingleUserPermissions,
 updateUserPermissions
}
