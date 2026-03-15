"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = exports.setPermissionsForUser = exports.getPermissionsForUser = void 0;
const permission_service_1 = require("./permission.service");
const createPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield permission_service_1.PermissionService.createPermission(req.body);
    res.json({
        success: true,
        data: result
    });
});
const getPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield permission_service_1.PermissionService.getPermissions();
    res.json({
        success: true,
        data: result
    });
});
// Get permissions for a specific user
const getPermissionsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const permissions = yield (0, permission_service_1.getSingleUserPermissions)(userId);
    res.json({ success: true, data: permissions });
});
exports.getPermissionsForUser = getPermissionsForUser;
// Update permissions (toggle) for a user
const setPermissionsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actorId = req.user.id;
    const { userId } = req.params;
    const { permissions } = req.body; // array of permission IDs
    const updatedUser = yield (0, permission_service_1.updateUserPermissions)(actorId, userId, permissions);
    res.json({ success: true, data: updatedUser });
});
exports.setPermissionsForUser = setPermissionsForUser;
exports.PermissionController = {
    createPermission,
    getPermissions
};
