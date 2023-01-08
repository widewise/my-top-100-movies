import { GraphQLID } from "graphql";
import { PersonType } from "../types/person";
import { PersonModel } from "../../data/person";

export const personQueries = {
    personById: {
        type: PersonType,
        args: {
            personId: {
                type: GraphQLID,
            },
        },
        resolve: (_, { personId }) => {
            if(!personId) {
                return {
                    id: "",
                    name: "",
                    gender: "male",
                };
            }

            return PersonModel.findById(personId);
        }
    },
};