import {
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';
import { FavoriteModel } from "../../data/favorite";
import { CheckFavoriteType } from "../types/favorite";
import {IAuthContext} from "../../data/user";
import {contextService} from "../../services/contextService";

export const favoriteQueries = {
    checkFavoriteMovie: {
        type: CheckFavoriteType,
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            }
        },
        resolve: async (_, { movieId }, context: IAuthContext) => {
            contextService.validateAuth(context);
            const isExists = await FavoriteModel.exists({ movieId: movieId, userId: context.userId}).exec();
            return {
                isFavorite: isExists !== null
            };
        },
    },
};