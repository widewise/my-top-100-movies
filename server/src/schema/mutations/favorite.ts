import {
    GraphQLID,
    GraphQLNonNull,
} from "graphql";
import {
    FavoriteType,
} from "../types/favorite";
import { FavoriteModel } from "../../data/favorite";
import { IAuthContext } from "../../data/user";
import { contextService } from "../../services/contextService";

export const favoriteMutations = {
    addFavoriteMovie: {
        type: FavoriteType,
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (rootValue, { movieId }, context: IAuthContext) => {
            contextService.validateAuth(context);

            const newFavorite = await FavoriteModel.findOne({ movieId, userId: context.userId }).exec();
            if(newFavorite) {
                return newFavorite;
            }

            const newModel = new FavoriteModel({ movieId, userId: context.userId });
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
        },
        resolve: async (rootValue, { movieId }, context: IAuthContext) => {
            contextService.validateAuth(context);

            const removed = await FavoriteModel.findOneAndRemove({ movieId, userId: context.userId }).exec();
            if (!removed) {
                throw new Error('Remove favorite movie error')
            }
            return removed;
        },
    },
};