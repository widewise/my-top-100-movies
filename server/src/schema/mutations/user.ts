import {
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
    IAuthContext,
    UserModel,
} from "../../data/user";
import { private_key } from "../../utils/key";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { contextService } from "../../services/contextService";

export const userMutations = {
    login: {
        type: UserTokenType,
        args: {
            input: {
                type: new GraphQLNonNull(LoginInputType),
            },
        },
        resolve: async (_, {input}) => {
            const user = await UserModel.findOne({ login: input.login, status: EUserStatus.Active }).exec();
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
                userType: user.type,
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
            const existUser = await UserModel.findOne({ login: input.login }).exec();
            if(existUser !== null) {
                if(existUser.status === EUserStatus.Removed) {
                    throw Error(`User with login '${input.login}' was removed. Use another login.`);
                }
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
        resolve: async (rootValue, { input }, context: IAuthContext) => {
            contextService.validateAuth(context);

            let updated;
            if(input.password) {
                updated = await UserModel.findById(context.userId).exec();
                if(!updated) {
                    throw new Error('Update user error. User not found.');
                }
                const isCorrectPassword = await bcrypt.compare(input.oldPassword, updated.password);
                if (!isCorrectPassword) {
                    throw new Error("Invalid old password")
                }
                const salt = await bcrypt.genSalt(10);
                const newPassword = await bcrypt.hash(input.password, salt);
                updated = await UserModel.findByIdAndUpdate(context.userId, {
                    password: newPassword,
                    email: input.email,
                    description: input.description,
                }).exec();
            } else {
                updated = await UserModel.findByIdAndUpdate(context.userId, {
                    email: input.email,
                    description: input.description,
                }).exec();
            }

            if (!updated) {
                throw new Error('Update user error');
            }
            return updated;
        },
    },
    deleteUser: {
        type: UserType,
        resolve: async (rootValue, args, context: IAuthContext) => {
            contextService.validateAuth(context);

            const removed = await UserModel.findByIdAndUpdate(context.userId, { status: EUserStatus.Removed }).exec();
            if (!removed) {
                throw new Error('Remove user error');
            }
            return removed;
        },
    },
};