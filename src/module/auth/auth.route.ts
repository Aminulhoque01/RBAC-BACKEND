import express from "express"
import { login, refreshToken, register,   } from "./auth.controller"

const AuthRouter = express.Router()
AuthRouter.post("/register",  register)
AuthRouter.post("/login",login)
AuthRouter.post("/refresh-token",refreshToken)
 

export default AuthRouter