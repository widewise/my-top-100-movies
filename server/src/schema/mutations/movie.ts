import {
    GraphQLID,
    GraphQLNonNull,
} from "graphql";
import {
    CreateMovieInputType,
    InputMovieType,
    MovieType,
} from "../types/movie";
import { MovieModel } from "../../data/movie";
import { RateModel } from "../../data/rate";
import { ActorModel } from "../../data/actor";
import { FavoriteModel } from "../../data/favorite";
import { IAuthContext } from "../../data/user";
import { contextService } from "../../services/contextService";

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
    updateMovie: {
        type: MovieType,
        args: {
            input: {
                type: new GraphQLNonNull(InputMovieType),
            },
        },
        resolve: async (rootValue, { input }, context: IAuthContext) => {
            contextService.checkIsAdmin(context);

            const updated = await MovieModel.findByIdAndUpdate(input.id, input).exec();

            if (!updated) {
                throw new Error('Update user error');
            }

            return updated;
        },
    },

    removeMovie: {
        type: MovieType,
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (rootValue, { movieId }, context: IAuthContext) => {
            if(!movieId) {
                throw Error("Movie id is required");
            }

            contextService.checkIsAdmin(context);

            await ActorModel.deleteMany({ movieId: movieId }).exec();
            await FavoriteModel.deleteMany({ movieId: movieId }).exec();
            await RateModel.deleteMany({ movieId: movieId }).exec();
            const removedMovie = await MovieModel.findByIdAndRemove(movieId).exec();
            if (!removedMovie) {
                throw new Error('Remove movie error')
            }
            return removedMovie;
        },
    },
};