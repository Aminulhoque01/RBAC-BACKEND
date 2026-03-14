import express from "express"
import { login, logout, refresh } from "./auth.controller"
import { authRateLimiter } from "../../middileware/rateLimiter"
 

const router = express.Router()

router.post("/login", authRateLimiter, login)
router.post("/logout", logout)
router.post("/refresh", refresh)

export const AuthRoutes = router
