import {
    GraphQLID,
    GraphQLList,
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
                type: GraphQLID,
            },
        },
        resolve: (_, { movieId }) => {
            if(!movieId) {
                return {
                    id: "",
                    name: "",
                    type: "film",
                    genres: [],
                    year: 2020,
                }
            }
            return MovieModel.findById(movieId);
        }
    },
};