"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@babel/polyfill");
const isAuthenticated_1 = __importDefault(require("./isAuthenticated"));
const hasRole_1 = __importDefault(require("./hasRole"));
const utils_1 = require("./utils");
exports.authenticate = utils_1.authenticate;
exports.checkRole = utils_1.checkRole;
const AuthDirective = (args = {}) => {
    const auth = args.authenticateFunc || utils_1.authenticate;
    return {
        isAuthenticated: isAuthenticated_1.default(auth),
        hasRole: hasRole_1.default(auth, args.checkRoleFunc),
    };
};
exports.AuthDirective = AuthDirective;
