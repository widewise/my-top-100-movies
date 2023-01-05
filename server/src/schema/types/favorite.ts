import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID, GraphQLBoolean,
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

export const CheckFavoriteType = new GraphQLObjectType({
    name: 'CheckFavoriteMovieType',
    description: 'Check favorite movie',
    fields: () => ({
        isFavorite: {
            type: new GraphQLNonNull(GraphQLBoolean),
        }
    }),
});