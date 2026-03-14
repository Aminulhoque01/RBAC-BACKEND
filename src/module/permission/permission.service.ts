import { PermissionModel } from "./permission.model"

 

const createPermission = async (payload:any)=>{

 return await PermissionModel.create(payload)

}

const getPermissions = async ()=>{

 return await PermissionModel.find()

}

export const PermissionService = {
 createPermission,
 getPermissions
}
