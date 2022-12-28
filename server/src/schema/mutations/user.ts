import {
    GraphQLID,
    GraphQLNonNull,
} from "graphql";
import {
    UserType,
    RegistrationInputType,
    EditUserInputType,
} from "../types/user";
import { EUserStatus } from "../../data/user";
import { MovieModel } from "../../data/movie";

export const userMutations = {
    registration: {
        type: UserType,
        args: {
            input: {
                type: new GraphQLNonNull(RegistrationInputType),
            },
        },
        resolve: (rootValue, { input }) => {
            const newModel = new MovieModel(input);
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
        resolve: (rootValue, { input }) => {
            if(!input.id) {
                throw Error("User id is required");
            }
            const updated = MovieModel.findByIdAndUpdate(input.id, {
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
        resolve: (rootValue, { userId }) => {
            if(!userId) {
                throw Error("User id is required");
            }
            const removed = MovieModel.findByIdAndUpdate(userId, { status: EUserStatus.Removed }).exec();
            if (!removed) {
                throw new Error('Remove user error')
            }
            return removed;
        },
    },
};