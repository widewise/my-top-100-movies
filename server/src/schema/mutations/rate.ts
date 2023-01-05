import {
    GraphQLNonNull,
} from "graphql";
import {
    RateType,
    GiveMovieRateInputType,
} from "../types/rate";
import { RateModel } from "../../data/rate";

export const rateMutations = {
    rateMovie: {
        type: RateType,
        args: {
            input: {
                type: new GraphQLNonNull(GiveMovieRateInputType),
            },
        },
        resolve: (rootValue, { input }) => {
            let newRate = RateModel.findOneAndUpdate(
                { movieId: input.movieId, userId: input.userId },
                input,
                {upsert: true});

            if(!newRate) {
                newRate = RateModel.findOne({ movieId: input.movieId, userId: input.userId });
                if(!newRate) {
                    throw Error("Rate movie error");
                }
            }

            return newRate;
        },
    },
};