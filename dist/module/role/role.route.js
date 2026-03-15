"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_controller_1 = require("./role.controller");
const router = express_1.default.Router();
router.post("/", role_controller_1.RoleController.createRole);
router.get("/", role_controller_1.RoleController.getRoles);
exports.RoleRoutes = router;
