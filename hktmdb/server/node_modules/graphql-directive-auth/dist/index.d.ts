import '@babel/polyfill';
import { authenticate, checkRole } from './utils';
export interface CheckRole {
    userRole: any;
}
export declare type authFunc = (any: any) => any;
export declare type checkRoleFunc = (auth: any, allowedRoles: any) => void;
export interface Args {
    authenticateFunc?: authFunc;
    checkRoleFunc?: checkRoleFunc;
}
declare const AuthDirective: (args?: Args) => any;
export { AuthDirective, authenticate, checkRole };
