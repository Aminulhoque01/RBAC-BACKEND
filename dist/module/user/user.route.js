"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/", user_controller_1.createUser);
router.get("/", user_controller_1.getUsers);
router.get("/:id", user_controller_1.getUser);
router.put("/:id", user_controller_1.updateUser);
router.patch("/:id/suspend", user_controller_1.suspendUser);
router.patch("/:id/ban", user_controller_1.banUser);
router.patch("/:id/activate", user_controller_1.activateUser);
exports.UserRoutes = router;
