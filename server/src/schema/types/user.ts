import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLEnumType,
    GraphQLID,
} from 'graphql';
import {
    EUserStatus,
    EUserType,
} from "../../data/user";

const UserTypeType = new GraphQLEnumType({
    name: 'UserTypeType',
    values: {
        User: { value: EUserType.User },
        Admin: { value: EUserType.Admin },
    }
});

const StatusType = new GraphQLEnumType({
    name: 'StatusType',
    values: {
        Active: { value: EUserStatus.Active },
        Removed: { value: EUserStatus.Removed },
    }
});

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'User',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        type: {
            type: new GraphQLNonNull(UserTypeType),
        },
        login: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: GraphQLString,
        },
        status: {
            type: new GraphQLNonNull(StatusType),
        },
        email: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
    }),
});


export const UserTokenType = new GraphQLObjectType({
    name: 'UserTokenType',
    description: 'User token',
    fields: () => ({
        token: {
            type: new GraphQLNonNull(GraphQLString),
        },
        userType: {
            type: new GraphQLNonNull(GraphQLString),
        },
        userId: {
            type: new GraphQLNonNull(GraphQLID),
        },
    }),
});

export const RegistrationInputType = new GraphQLInputObjectType({
    name: 'RegistrationInputType',
    description: 'Registration payload definition',
    fields: () => ({
        login: {
            type: new GraphQLNonNull(GraphQLString),
        },
        type: {
            type: UserTypeType,
        },
        password: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
    }),
});

export const LoginInputType = new GraphQLInputObjectType({
    name: 'LoginInputType',
    description: 'Login payload definition',
    fields: () => ({
        login: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: GraphQLString,
        },
    }),
});

export const EditUserInputType = new GraphQLInputObjectType({
    name: 'EditUserInputType',
    description: 'Edit user payload definition',
    fields: () => ({
        oldPassword: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
    }),
});