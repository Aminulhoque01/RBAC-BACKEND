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
exports.PermissionService = exports.updateUserPermissions = exports.getSingleUserPermissions = void 0;
const user_model_1 = require("../user/user.model");
const permission_model_1 = require("./permission.model");
const createPermission = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield permission_model_1.PermissionModel.create(payload);
});
const getPermissions = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield permission_model_1.PermissionModel.find();
});
const getSingleUserPermissions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.UserModel.findById(userId)
        .populate({
        path: "role",
        populate: { path: "permissions" }
    })
        .populate("customPermissions");
    const rolePermissions = ((_a = user === null || user === void 0 ? void 0 : user.role) === null || _a === void 0 ? void 0 : _a.permissions) || [];
    const customPermissions = (user === null || user === void 0 ? void 0 : user.customPermissions) || [];
    // Merge unique permissions
    const resolvedPermissions = [
        ...rolePermissions.map((p) => p._id.toString()),
        ...customPermissions.map((p) => p._id.toString())
    ];
    return Array.from(new Set(resolvedPermissions));
});
exports.getSingleUserPermissions = getSingleUserPermissions;
const updateUserPermissions = (actorId, targetUserId, permissionIds) => __awaiter(void 0, void 0, void 0, function* () {
    // 1️⃣ Get actor's permissions (they cannot grant beyond this)
    const actorPermissions = yield (0, exports.getSingleUserPermissions)(actorId);
    // 2️⃣ Filter only allowed permissions
    const allowedPermissions = permissionIds.filter(pid => actorPermissions.includes(pid));
    // 3️⃣ Update target user's customPermissions
    const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(targetUserId, { customPermissions: allowedPermissions }, { new: true }).populate("customPermissions");
    return updatedUser;
});
exports.updateUserPermissions = updateUserPermissions;
exports.PermissionService = {
    createPermission,
    getPermissions,
    getSingleUserPermissions: exports.getSingleUserPermissions,
    updateUserPermissions: exports.updateUserPermissions
};
