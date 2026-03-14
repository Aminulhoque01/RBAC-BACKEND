import express from "express"
import { PermissionController } from "./permission.controller"
 

const router = express.Router()

router.post("/",PermissionController.createPermission)

router.get("/",PermissionController.getPermissions)

export const PermissionRoutes = router
