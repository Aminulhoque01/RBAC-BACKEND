import { Request, Response } from "express"
import { UserService } from "./user.service"

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body)
    res.json({ success: true, data: user })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserService.getUsers()
  res.json({ success: true, data: users })
}

export const getUser = async (req: Request, res: Response) => {
  const user = await UserService.getUserById(req.params.id as string)
  res.json({ success: true, data: user })
}

export const updateUser = async (req: Request, res: Response) => {
  const user = await UserService.updateUser(req.params.id as string, req.body)
  res.json({ success: true, data: user })
}

export const suspendUser = async (req: Request, res: Response) => {
  const user = await UserService.suspendUser(req.params.id as string)
  res.json({ success: true, data: user })
}

export const banUser = async (req: Request, res: Response) => {
  const user = await UserService.banUser(req.params.id as string)
  res.json({ success: true, data: user })
}

export const activateUser = async (req: Request, res: Response) => {
  const user = await UserService.activateUser(req.params.id as string)
  res.json({ success: true, data: user })
}
