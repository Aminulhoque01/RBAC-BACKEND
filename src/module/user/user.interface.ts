import { Types } from "mongoose"

export interface IUser {
  name: string
  email: string
  password: string
  role: Types.ObjectId
  permissions: Types.ObjectId[]
  status: "active" | "suspended" | "banned"
}


 