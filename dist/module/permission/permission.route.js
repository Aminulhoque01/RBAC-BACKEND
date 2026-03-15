"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const permission_controller_1 = require("./permission.controller");
const authmiddileware_1 = require("../../middileware/authmiddileware");
const router = express_1.default.Router();
router.post("/", permission_controller_1.PermissionController.createPermission);
router.get("/", permission_controller_1.PermissionController.getPermissions);
router.get("/:userId", authmiddileware_1.authMiddleware, permission_controller_1.getPermissionsForUser);
router.put("/:userId", authmiddileware_1.authMiddleware, permission_controller_1.setPermissionsForUser);
exports.PermissionRoutes = router;
