export declare class AuthError extends Error {
    code: number;
    constructor(message?: string, code?: number);
}
export declare const authenticate: (context: any) => string | object;
export declare const checkRole: (context: any, requiredRoles: any) => void;
