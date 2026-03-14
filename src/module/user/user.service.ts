import { UserModel } from "./user.model"

 
const createUser = async(payload:any)=>{

 return await UserModel.create(payload)

}

const getUsers = async()=>{

 return await UserModel.find()
 .populate("role")
 .populate("customPermissions")

}

export const UserService = {
 createUser,
 getUsers
}
