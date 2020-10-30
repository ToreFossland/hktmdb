"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const graphql_1 = require("graphql");
const index_1 = require("./index");
exports.default = (authenticate, checkRoleFunc) => class HasRole extends graphql_tools_1.SchemaDirectiveVisitor {
    static getDirectiveDeclaration(directiveName = 'hasRole') {
        return new graphql_1.GraphQLDirective({
            name: directiveName,
            locations: [graphql_1.DirectiveLocation.FIELD_DEFINITION],
            args: {
                role: { type: graphql_1.GraphQLString },
            },
        });
    }
    visitFieldDefinition(field) {
        const { resolve = graphql_1.defaultFieldResolver } = field;
        const hasResolveFn = field.resolve !== undefined;
        field.resolve = (root, args, context, info) => {
            const auth = authenticate(context);
            const allowedRoles = this.args.role;
            const checkRoleFn = checkRoleFunc || index_1.checkRole;
            const newContext = { ...context, auth };
            try {
                checkRoleFn(newContext, allowedRoles);
            }
            catch (error) {
                if (!hasResolveFn) {
                    return null;
                }
                throw error;
            }
            return resolve.call(this, root, args, { ...newContext }, info);
        };
    }
};
