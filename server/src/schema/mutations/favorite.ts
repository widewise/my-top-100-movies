import {
    GraphQLID,
    GraphQLNonNull,
} from "graphql";
import {
    FavoriteType,
} from "../types/favorite";
import { FavoriteModel } from "../../data/favorite";

export const favoriteMutations = {
    addFavoriteMovie: {
        type: FavoriteType,
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
            userId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (rootValue, { movieId, userId }) => {
            const newFavorite = await FavoriteModel.findOne({ movieId, userId }).exec();
            if(newFavorite) {
                return newFavorite;
            }

            const newModel = new FavoriteModel({ movieId, userId });
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
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
            userId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (rootValue, { movieId, userId }) => {
            const removed = await FavoriteModel.findOneAndRemove({ movieId, userId }).exec();
            if (!removed) {
                throw new Error('Remove favorite movie error')
            }
            return removed;
        },
    },
};