import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';
import {
    LoginInputType,
    UserType,
} from "../types/user";
import { UserModel } from "../../data/user";

export const userQueries = {
    login: {
        type: new GraphQLList(UserType),
        args: {
            input: {
                type: new GraphQLNonNull(LoginInputType),
            },
        },
        resolve: ({input}) => {
            const user = UserModel.findOne({ login: input.login });
            if(!user) {
                throw Error(`User with login ${input.login} doesn't exist`);
            }
            console.log(user);
            // @ts-ignore
            if(user.password !== input.password) {
                throw Error("Incorrect password");
            }
        }
    },
    profile: {
        type: new GraphQLList(UserType),
        args: {
            userId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: ({userId}) => {
            return UserModel.findById(userId);
        }
    },
};