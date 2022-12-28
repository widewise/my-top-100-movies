import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLEnumType,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} from 'graphql';
import { PersonType } from "./person";
import {EMovieGenre, EMovieType} from "../../data/movie";

const MovieTypeType = new GraphQLEnumType({
    name: 'MovieTypeType',
    values: {
        Film: { value: EMovieType.Film },
        TvShow: { value: EMovieType.TvShow },
    }
});

const MovieGenreType = new GraphQLEnumType({
    name: 'MovieGenreType',
    description: "Movie genre",
    values: {
        Action: { value: EMovieGenre.Action },
        Animation: { value: EMovieGenre.Animation },
        Adventure: { value: EMovieGenre.Adventure },
        Comedy: { value: EMovieGenre.Comedy },
        Crime: { value: EMovieGenre.Crime },
        Drama: { value: EMovieGenre.Drama },
        Horror: { value: EMovieGenre.Horror },
        History: { value: EMovieGenre.History },
        Family: { value: EMovieGenre.Family },
        Fantasy: { value: EMovieGenre.Fantasy },
        Romance: { value: EMovieGenre.Romance },
        ScienceFiction: { value: EMovieGenre.ScienceFiction },
        Thriller: { value: EMovieGenre.Thriller },
    }
});

export const MovieType = new GraphQLObjectType({
    name: 'MovieType',
    description: 'Movie',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        type: {
            type: new GraphQLNonNull(MovieTypeType),
        },
        genres: {
            type: new GraphQLList(MovieGenreType),
        },
        year: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        totalScore : {
            type: GraphQLInt,
        },
        duration : {
            type: new GraphQLNonNull(GraphQLInt),
            description: "Movie duration in minutes"
        },
        description: {
            type: GraphQLString,
        },
        posterUrl: {
            type: GraphQLString,
        },
        director: {
            type: PersonType,
        },
        producer: {
            type: PersonType,
        },
    }),
});

export const CreateMovieInputType = new GraphQLInputObjectType({
    name: 'CreateMovieInputType',
    description: 'Create movie payload definition',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        type: {
            type: new GraphQLNonNull(MovieTypeType),
        },
        genres: {
            type: new GraphQLList(MovieGenreType),
        },
        year: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        duration : {
            type: new GraphQLNonNull(GraphQLInt),
            description: "Movie duration in minutes"
        },
        description: {
            type: GraphQLString,
        },
        posterUrl: {
            type: GraphQLString,
        },
    }),
});