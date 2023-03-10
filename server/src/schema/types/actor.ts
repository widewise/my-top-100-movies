import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} from 'graphql';
import { PersonType } from "./person";
import {MovieType} from "./movie";

export const ActorType = new GraphQLObjectType({
    name: 'ActorType',
    description: 'Actor',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        movieId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        movie: {
            type: MovieType,
        },
        personId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        person: {
            type: PersonType,
        },
        role: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }),
});

export const AddActorToMovieInputType = new GraphQLInputObjectType({
    name: 'AddActorToMovieInputType',
    description: 'Add actor to movie payload definition',
    fields: () => ({
        personId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        movieId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        role: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }),
});