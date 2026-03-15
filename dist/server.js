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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = require("./module/auth/auth.route");
const user_route_1 = require("./module/user/user.route");
const role_route_1 = require("./module/role/role.route");
const permission_route_1 = require("./module/permission/permission.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000/",
    credentials: true, // ✅ allow cookies
}));
// routes
app.use("/api/v1/auth", auth_route_1.AuthRoutes);
app.use("/api/v1/users", user_route_1.UserRoutes);
app.use("/api/v1/roles", role_route_1.RoleRoutes);
app.use("/api/v1/permissions", permission_route_1.PermissionRoutes);
// database connection + server start
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.DB_URL);
            console.log("Database Connected");
            app.listen(port, () => {
                console.log(`Server running on ${port}`);
            });
        }
        catch (error) {
            console.log("Server Error:", error);
        }
    });
}
startServer();
