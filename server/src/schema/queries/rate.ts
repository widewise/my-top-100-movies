import {
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';
import { RateModel } from "../../data/rate";
import { RateType } from "../types/rate";
import { IAuthContext } from "../../data/user";
import { contextService } from "../../services/contextService";

export const rateQueries = {
    getMovieRate: {
        type: RateType,
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            }
        },
        resolve: async (_, { movieId }, context: IAuthContext) => {
            contextService.validateAuth(context);
            const rate = await RateModel.findOne({ movieId: movieId, userId: context.userId}).exec();
            if(!rate) {
                throw Error(`Can't find rate with movie id ${movieId} and user id ${context.userId}`);
            }
            return rate;
        },
    },
};