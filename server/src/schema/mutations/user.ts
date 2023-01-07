import {
    GraphQLID,
    GraphQLNonNull,
} from "graphql";
import {
    UserType,
    RegistrationInputType,
    EditUserInputType,
    UserTokenType,
    LoginInputType,
} from "../types/user";
import {
    EUserStatus,
    UserModel,
} from "../../data/user";
import { private_key } from "../../utils/key";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userMutations = {
    login: {
        type: UserTokenType,
        args: {
            input: {
                type: new GraphQLNonNull(LoginInputType),
            },
        },
        resolve: async (_, {input}) => {
            const user = await UserModel.findOne({ login: input.login }).exec();
            if(!user) {
                throw Error(`User with login ${input.login} doesn't exist`);
            }

            const isCorrectPassword = await bcrypt.compare(input.password, user.password);
            if (!isCorrectPassword) {
                throw new Error("Invalid credentials")
            }
            const token = jwt.sign({ _id: user._id, email: user.email }, private_key, {
                algorithm: "RS256"
            });
            return {
                token,
                userId: user._id
            }
        }
    },
    registration: {
        type: UserType,
        args: {
            input: {
                type: new GraphQLNonNull(RegistrationInputType),
            },
        },
        resolve: async (rootValue, { input }) => {
            const isExists = await UserModel.exists({ login: input.login }).exec();
            if(isExists !== null) {
                throw Error(`User with login '${input.login}' exists`);
            }
            const newModel = new UserModel(input);
            const newObj = newModel.save();
            if(!newObj) {
                throw Error("Registration error");
            }
            return newObj;
        },
    },
    updateUser: {
        type: UserType,
        args: {
            input: {
                type: new GraphQLNonNull(EditUserInputType),
            },
        },
        resolve: async (rootValue, { input }) => {
            if(!input.id) {
                throw Error("User id is required");
            }
            const updated = await UserModel.findByIdAndUpdate(input.id, {
                password: input.password,
                email: input.email,
                description: input.description,
            }).exec();
            if (!updated) {
                throw new Error('Update user error')
            }
            return updated;
        },
    },
    deleteUser: {
        type: UserType,
        args: {
            userId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (rootValue, { userId }) => {
            if(!userId) {
                throw Error("User id is required");
            }
            const removed = await UserModel.findByIdAndUpdate(userId, { status: EUserStatus.Removed }).exec();
            if (!removed) {
                throw new Error('Remove user error')
            }
            return removed;
        },
    },
};