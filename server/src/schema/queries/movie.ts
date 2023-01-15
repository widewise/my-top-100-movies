import {
    GraphQLID, GraphQLInt,
    GraphQLList, GraphQLNonNull, GraphQLString,
} from 'graphql';
import { MovieType } from "../types/movie";
import { MovieModel } from "../../data/movie";

export const movieQueries = {
    movies: {
        type: new GraphQLList(MovieType),
        args: {
            search: {
                type: GraphQLString,
            },
            offset: {
                type: new GraphQLNonNull(GraphQLInt),
            },
            limit: {
                type: new GraphQLNonNull(GraphQLInt),
            },
        },
        resolve: (_, { search, offset, limit }) => {
            if(offset < 0) {
                throw Error(`Invalid offset value ${offset}`);
            }
            if(limit < 1) {
                throw Error(`Invalid limit value ${limit}`);
            }
            const filter = search ? { "name": { $regex : search }} : {};
            return MovieModel.find(filter)
                .sort({ totalScore: -1, name: 1 })
                .skip(offset)
                .limit(limit);
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