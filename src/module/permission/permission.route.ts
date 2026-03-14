import express from "express"
import { getPermissionsForUser, PermissionController, setPermissionsForUser } from "./permission.controller"
import { authMiddleware } from "../../middileware/authmiddileware"
 

const router = express.Router()

router.post("/",PermissionController.createPermission)

router.get("/",PermissionController.getPermissions)

router.get("/:userId", authMiddleware, getPermissionsForUser)
router.put("/:userId", authMiddleware, setPermissionsForUser)

export const PermissionRoutes = router
