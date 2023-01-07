import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
} from 'graphql';

export const RateType = new GraphQLObjectType({
    name: 'RateType',
    description: 'Movie rate by user',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        userId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        movieId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        rate: {
            type: GraphQLInt,
            description: "Rate from 1 to 10",
        },
    }),
});

export const GiveMovieRateInputType = new GraphQLInputObjectType({
    name: 'GiveMovieRateInputType',
    description: 'Give rate to movie payload definition',
    fields: () => ({
        movieId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        rate: {
            type: GraphQLInt,
            description: "Rate from 1 to 10",
        },
    }),
});