import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';
import { MovieType } from "../types/movie";
import { MovieModel } from "../../data/movie";

export const movieQueries = {
    top100Movies: {
        type: new GraphQLList(MovieType),
        resolve: () => {
            return MovieModel.find().sort({ totalScore: -1 }).limit(100);
        },
    },
    movieById: {
        type: MovieType,
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: (_, { movieId }) => {
            return MovieModel.findById(movieId);
        }
    },
};