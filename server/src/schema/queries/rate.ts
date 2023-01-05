import {
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';
import { RateModel } from "../../data/rate";
import { RateType } from "../types/rate";

export const rateQueries = {
    getMovieRate: {
        type: RateType,
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
            userId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (_, { movieId, userId }) => {
            const rate = await RateModel.findOne({ movieId: movieId, userId: userId}).exec();
            if(!rate) {
                throw Error(`Can't find rate with movie id ${movieId} and user id ${userId}`);
            }
            return rate;
        },
    },
};