"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const checkPermission = (permission) => {
    return (req, res, next) => {
        const userPermissions = req.user.permissions;
        if (!userPermissions.includes(permission)) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        next();
    };
};
exports.checkPermission = checkPermission;
