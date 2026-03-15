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
exports.RoleService = void 0;
const role_model_1 = require("./role.model");
const createRole = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield role_model_1.RoleModel.create(payload);
});
const getRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield role_model_1.RoleModel.find().populate("permissions");
});
exports.RoleService = {
    createRole,
    getRoles
};
