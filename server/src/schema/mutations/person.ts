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
import { IAuthContext } from "../../data/user";
import { contextService } from "../../services/contextService";

export const personMutations = {
    createPerson: {
        type: PersonType,
        args: {
            input: {
                type: new GraphQLNonNull(CreatePersonInputType),
            },
        },
        resolve: (rootValue, { input }, context: IAuthContext) => {
            contextService.checkIsAdmin(context);

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
        resolve: async (rootValue, { personId }, context: IAuthContext) => {
            contextService.checkIsAdmin(context);

            if(!personId) {
                throw Error("Person id is required");
            }

            await ActorModel.deleteMany({ personId: personId });
            const removed = await PersonModel.findByIdAndRemove(personId).exec();
            if (!removed) {
                throw new Error('Remove person error')
            }
            return removed;
        },
    },
};