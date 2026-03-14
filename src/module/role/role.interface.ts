import { Types } from "mongoose"

export interface IRole {
  name: "Admin" | "Manager" | "Agent" | "Customer"
 permissions:Types.ObjectId[]
}
