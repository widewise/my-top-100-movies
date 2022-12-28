import {
    GraphQLID,
    GraphQLNonNull,
} from "graphql";
import {
    PersonType,
    CreatePersonInputType,
} from "../types/person";
import { PersonModel } from "../../data/person";
import { ActorModel } from "../../data/actor";
import { CallbackError } from "mongoose";

export const personMutations = {
    createPerson: {
        type: PersonType,
        args: {
            input: {
                type: new GraphQLNonNull(CreatePersonInputType),
            },
        },
        resolve: (rootValue, { input }) => {
            const newModel = new PersonModel(input);
            const newObj = newModel.save();
            if(!newObj) {
                throw Error("Creating person error");
            }
            return newObj;
        },
    },
    removePerson: {
        type: PersonType,
        args: {
            movieId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: (rootValue, { personId }) => {
            if(!personId) {
                throw Error("Person id is required");
            }
            ActorModel.deleteMany({ personId: personId }, (error: CallbackError) => {
                console.error(error.message);
            });
            const removed = PersonModel.findByIdAndRemove(personId).exec();
            if (!removed) {
                throw new Error('Remove person error')
            }
            return removed;
        },
    },
};