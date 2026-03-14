import express from "express"
import { RoleController } from "./role.controller"

const router = express.Router()

router.post("/",RoleController.createRole)

router.get("/",RoleController.getRoles)

export const RoleRoutes = router
