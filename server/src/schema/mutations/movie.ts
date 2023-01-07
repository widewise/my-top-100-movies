import {
    GraphQLID,
    GraphQLNonNull,
} from "graphql";
import {
    CreateMovieInputType,
    MovieType,
} from "../types/movie";
import { MovieModel } from "../../data/movie";
import { RateModel } from "../../data/rate";
import { ActorModel } from "../../data/actor";
import { FavoriteModel } from "../../data/favorite";
import { CallbackError } from "mongoose";
import {IAuthContext} from "../../data/user";
import {contextService} from "../../services/contextService";

export const movieMutations = {
    createMovie: {
        type: MovieType,
        args: {
            input: {
                type: new GraphQLNonNull(CreateMovieInputType),
            },
        },
        resolve: (rootValue, { input }, context: IAuthContext) => {
            contextService.checkIsAdmin(context);

            const newModel = new MovieModel(input);
            const newObj = newModel.save();
            if(!newObj) {
                throw Error("Creating movie error");
            }
            return newObj;
        },
    },
    removeMovie: {
        type: MovieType,
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: (rootValue, { movieId }, context: IAuthContext) => {
            if(!movieId) {
                throw Error("Movie id is required");
            }

            contextService.checkIsAdmin(context);

            ActorModel.deleteMany({ movieId: movieId }, (error: CallbackError) => {
                console.error(error.message);
            });
            FavoriteModel.deleteMany({ movieId: movieId }, (error: CallbackError) => {
                console.error(error.message);
            });
            RateModel.deleteMany({ movieId: movieId }, (error: CallbackError) => {
                console.error(error.message);
            });
            const removedMovie = MovieModel.findByIdAndRemove(movieId).exec();
            if (!removedMovie) {
                throw new Error('Remove movie error')
            }
            return removedMovie;
        },
    },
};