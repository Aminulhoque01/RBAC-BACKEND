"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const rateLimiter_1 = require("../../middileware/rateLimiter");
const router = express_1.default.Router();
router.post("/login", rateLimiter_1.authRateLimiter, auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
router.post("/refresh", auth_controller_1.refresh);
exports.AuthRoutes = router;
