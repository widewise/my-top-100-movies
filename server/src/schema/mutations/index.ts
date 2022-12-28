import { GraphQLObjectType } from 'graphql';
import { actorMutations } from "./actor";
import { favoriteMutations } from "./favorite";
import { movieMutations } from "./movie";
import { personMutations } from "./person";
import { rateMutations } from "./rate";
import { userMutations } from "./user";

export const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        ...actorMutations,
        ...favoriteMutations,
        ...movieMutations,
        ...personMutations,
        ...rateMutations,
        ...userMutations,
    }),
});
