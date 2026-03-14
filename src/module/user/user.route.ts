import express from "express"
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  suspendUser,
  banUser,
  activateUser
} from "./user.controller"

const router = express.Router()

router.post("/", createUser)
router.get("/", getUsers)
router.get("/:id", getUser)
router.put("/:id", updateUser)
router.patch("/:id/suspend", suspendUser)
router.patch("/:id/ban", banUser)
router.patch("/:id/activate", activateUser)

export const UserRoutes = router
