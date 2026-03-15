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
exports.UserService = exports.updateUser = exports.createUser = void 0;
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Hash password in service
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(payload.password, salt);
    const user = yield user_model_1.UserModel.create(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
    return user;
});
exports.createUser = createUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.find()
        .populate("role")
        .populate("customPermissions");
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.findById(id)
        .populate("role")
        .populate("customPermissions");
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Hash password if updating
    if (payload.password) {
        const salt = yield bcryptjs_1.default.genSalt(10);
        payload.password = yield bcryptjs_1.default.hash(payload.password, salt);
    }
    const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(id, payload, { new: true });
    return updatedUser;
});
exports.updateUser = updateUser;
const suspendUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.findByIdAndUpdate(id, { status: "suspended" }, { new: true });
});
const banUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.findByIdAndUpdate(id, { status: "banned" }, { new: true });
});
const activateUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.findByIdAndUpdate(id, { status: "active" }, { new: true });
});
exports.UserService = {
    createUser: exports.createUser,
    getUsers,
    getUserById,
    updateUser: exports.updateUser,
    suspendUser,
    banUser,
    activateUser
};
