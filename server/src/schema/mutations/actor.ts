import {
    GraphQLID,
    GraphQLNonNull,
} from "graphql";
import {
    ActorType,
    AddActorToMovieInputType,
} from "../types/actor";
import { ActorModel } from "../../data/actor";
import { IAuthContext } from "../../data/user";
import { contextService } from "../../services/contextService";

export const actorMutations = {
    addActorToMovie: {
        type: ActorType,
        args: {
            input: {
                type: new GraphQLNonNull(AddActorToMovieInputType),
            },
        },
        resolve: (rootValue, { input }, context: IAuthContext) => {
            contextService.checkIsAdmin(context);

            const newModel = new ActorModel(input);
            const newObj = newModel.save();
            if(!newObj) {
                throw Error("Adding actor to movie error");
            }
            return newObj;
        },
    },
    removeActorFromMovie: {
        type: ActorType,
        args: {
            actorId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: (rootValue, { actorId }, context: IAuthContext) => {
            contextService.checkIsAdmin(context);

            const removed = ActorModel.findByIdAndRemove(actorId).exec();
            if (!removed) {
                throw new Error('Remove actor from movie error')
            }
            return removed;
        },
    },
};