"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose_1.Schema.Types.ObjectId, ref: "Role" },
    customPermissions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Permission" }],
    status: { type: String, enum: ["active", "suspended", "banned"], default: "active" }
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
