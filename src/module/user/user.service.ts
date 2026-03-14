import { UserModel } from "./user.model"
import bcrypt from "bcryptjs"
import { Types } from "mongoose"

export const createUser = async (payload: any) => {
  // Hash password in service
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(payload.password, salt)

  const user = await UserModel.create({
    ...payload,
    password: hashedPassword
  })

  return user
}


const getUsers = async () => {
  return await UserModel.find()
    .populate("role")
    .populate("customPermissions")
}

const getUserById = async (id: string) => {
  return await UserModel.findById(id)
    .populate("role")
    .populate("customPermissions")
}

export const updateUser = async (id: string, payload: any) => {
  // Hash password if updating
  if (payload.password) {
    const salt = await bcrypt.genSalt(10)
    payload.password = await bcrypt.hash(payload.password, salt)
  }
  const updatedUser = await UserModel.findByIdAndUpdate(id, payload, { new: true })
  return updatedUser
}


const suspendUser = async (id: string) => {
  return await UserModel.findByIdAndUpdate(id, { status: "suspended" }, { new: true })
}

const banUser = async (id: string) => {
  return await UserModel.findByIdAndUpdate(id, { status: "banned" }, { new: true })
}

const activateUser = async (id: string) => {
  return await UserModel.findByIdAndUpdate(id, { status: "active" }, { new: true })
}

export const UserService = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  suspendUser,
  banUser,
  activateUser
}
