import {
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';
import { PersonType } from "../types/person";
import { PersonModel } from "../../data/person";

export const personQueries = {
    personById: {
        type: PersonType,
        args: {
            personId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: (_, { personId }) => {
            return PersonModel.findById(personId);
        }
    },
};