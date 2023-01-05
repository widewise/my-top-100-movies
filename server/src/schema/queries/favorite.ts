import {
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';
import { FavoriteModel } from "../../data/favorite";
import { CheckFavoriteType } from "../types/favorite";

export const favoriteQueries = {
    checkFavoriteMovie: {
        type: CheckFavoriteType,
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
            userId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (_, { movieId, userId }) => {
            const isExists = await FavoriteModel.exists({ movieId: movieId, userId: userId}).exec();
            return {
                isFavorite: isExists !== null
            };
        },
    },
};