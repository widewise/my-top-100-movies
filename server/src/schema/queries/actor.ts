import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';
import { ActorType } from "../types/actor";
import { ActorModel } from "../../data/actor";
import { PersonType } from "../types/person";
import { PersonModel } from "../../data/person";

export const actorQueries = {
    actorsByMovieId: {
        type: new GraphQLList(ActorType),
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (_, { movieId }) => {
            const actors = await ActorModel.aggregate([
                {
                    $match: {
                        movieId: { $eq: movieId }
                    }
                },
                {
                    $addFields: {
                        personObjectId: { $toObjectId: "$personId" }
                    }
                },
                {
                    $lookup: {
                        from: "people",
                        localField: "personObjectId",
                        foreignField: "_id",
                        as: "person"
                    }
                }]).exec();
            for (const actor of actors) {
                actor.id = actor._id;
                actor.person = actor.person[0];
                actor.person.id = actor.person._id;
            }
            return actors;
        },
    },
    moviesByPersonId: {
        type: new GraphQLList(ActorType),
        args: {
            personId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (_, { personId }) => {
            const actors = await ActorModel.aggregate([
                {
                    $match: {
                        personId: { $eq: personId }
                    }
                },
                {
                    $addFields: {
                        movieObjectId: { $toObjectId: "$movieId" }
                    }
                },
                {
                    $lookup: {
                        from: "movies",
                        localField: "movieObjectId",
                        foreignField: "_id",
                        as: "movie"
                    }
                }]).exec();
            for (const actor of actors) {
                actor.id = actor._id;
                actor.movie = actor.movie[0];
                actor.movie.id = actor.movie._id;
            }
            return actors;
        },
    },
    personsToAddToMovie: {
        type: new GraphQLList(PersonType),
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (_, { movieId }) => {
            const movieActorsPersons = await ActorModel.find(
                { movieId: movieId},
                { role:0, _id: 0, movieId:0 }).exec();
            const movieActorsPersonIds = movieActorsPersons.map(o => o.personId);
            return await PersonModel.find({ _id: { $nin: movieActorsPersonIds } }).exec();
        },
    },
};