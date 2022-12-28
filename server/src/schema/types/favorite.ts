import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';
import { MovieType } from "./movie";

export const FavoriteType = new GraphQLObjectType({
    name: 'FavoriteType',
    description: 'Favorite movie',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        userId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        movie: {
            type: new GraphQLNonNull(MovieType),
        },
    }),
});

export const AddFavoriteMovieInputType = new GraphQLInputObjectType({
    name: 'AddFavoriteMovieInputType',
    description: 'Add favorite movie payload definition',
    fields: () => ({
        userId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        movieId: {
            type: new GraphQLNonNull(GraphQLID),
        },
    }),
});