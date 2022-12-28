import {
    GraphQLID,
    GraphQLNonNull,
} from "graphql";
import {
    FavoriteType,
    AddFavoriteMovieInputType,
} from "../types/favorite";
import { FavoriteModel } from "../../data/favorite";

export const favoriteMutations = {
    addFavoriteMovie: {
        type: FavoriteType,
        args: {
            input: {
                type: new GraphQLNonNull(AddFavoriteMovieInputType),
            },
        },
        resolve: (rootValue, { input }) => {
            const newModel = new FavoriteModel(input);
            const newObj = newModel.save();
            if(!newObj) {
                throw Error("Adding favorite movie error");
            }
            return newObj;
        },
    },
    removeFavoriteMovie: {
        type: FavoriteType,
        args: {
            actorId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: (rootValue, { favoriteId }) => {
            const removed = FavoriteModel.findByIdAndRemove(favoriteId).exec();
            if (!removed) {
                throw new Error('Remove favorite movie error')
            }
            return removed;
        },
    },
};