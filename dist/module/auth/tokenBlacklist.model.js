"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBlacklist = void 0;
const mongoose_1 = require("mongoose");
const tokenBlacklistSchema = new mongoose_1.Schema({
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true }
});
exports.TokenBlacklist = (0, mongoose_1.model)("TokenBlacklist", tokenBlacklistSchema);
