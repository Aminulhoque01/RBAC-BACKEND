import { RoleModel } from "./role.model"

 

const createRole = async(payload:any)=>{

 return await RoleModel.create(payload)

}

const getRoles = async()=>{

 return await RoleModel.find().populate("permissions")

}

export const RoleService = {
 createRole,
 getRoles
}
