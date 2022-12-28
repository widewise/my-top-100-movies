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
            const newModel = new RateModel(input);
            const newObj = newModel.save();
            if(!newObj) {
                throw Error("Giving rate to movie error");
            }
            return newObj;
        },
    },
};