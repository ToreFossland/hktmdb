"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthError extends Error {
    constructor(message = 'Error occured', code = 400) {
        super(message);
        this.code = code;
    }
}
exports.AuthError = AuthError;
exports.authenticate = (context) => {
    const authorization = context.req.get('Authorization');
    if (authorization) {
        const token = authorization.replace('Bearer ', '');
        try {
            const secret = process.env.APP_SECRET;
            if (!secret) {
                throw new Error('Secret not provided, please provide `APP_SECRET` with your token');
            }
            return jsonwebtoken_1.default.verify(token, secret);
        }
        catch (e) {
            throw new AuthError('Invalid token!', 401);
        }
    }
    throw new AuthError('Not authorized!', 401);
};
exports.checkRole = (context, requiredRoles) => {
    const userRole = context.auth.role;
    if (!userRole) {
        throw new Error(`Invalid token payload, missing role property inside!`);
    }
    const hasNeededRole = requiredRoles
        .split(',')
        .map((role) => role.trim().toLowerCase())
        .includes(userRole.toLowerCase());
    if (!hasNeededRole) {
        throw new Error(`Must have role: ${requiredRoles}, you have role: ${userRole}`);
    }
};
