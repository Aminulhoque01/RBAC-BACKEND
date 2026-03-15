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
exports.refresh = exports.logout = exports.login = void 0;
const auth_service_1 = require("./auth.service");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const tokens = yield auth_service_1.AuthService.loginUser(email, password);
        // Send refresh token as HttpOnly cookie
        res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.json({ success: true, accessToken: tokens.accessToken });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.cookies.refreshToken;
    if (!token)
        return res.status(400).json({ success: false, message: "Token required" });
    yield auth_service_1.AuthService.logoutUser(token);
    res.clearCookie("refreshToken");
    res.json({ success: true, message: "Logged out" });
});
exports.logout = logout;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.refreshToken;
    if (!token)
        return res.status(400).json({ success: false, message: "Refresh token required" });
    try {
        const accessToken = yield auth_service_1.AuthService.refreshToken(token);
        res.json({ success: true, accessToken });
    }
    catch (err) {
        res.status(401).json({ success: false, message: err.message });
    }
});
exports.refresh = refresh;
