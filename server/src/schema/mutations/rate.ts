import {
    GraphQLNonNull,
} from "graphql";
import {
    RateType,
    GiveMovieRateInputType,
} from "../types/rate";
import { RateModel } from "../../data/rate";
import { IAuthContext } from "../../data/user";
import { contextService } from "../../services/contextService";

export const rateMutations = {
    rateMovie: {
        type: RateType,
        args: {
            input: {
                type: new GraphQLNonNull(GiveMovieRateInputType),
            },
        },
        resolve: (rootValue, { input }, context: IAuthContext) => {
            contextService.validateAuth(context);

            let newRate = RateModel.findOneAndUpdate(
                { movieId: input.movieId, userId: context.userId },
                { ...input, userId: context.userId },
                {upsert: true});

            if(!newRate) {
                newRate = RateModel.findOne({ movieId: input.movieId, userId: context.userId });
                if(!newRate) {
                    throw Error("Rate movie error");
                }
            }

            return newRate;
        },
    },
};