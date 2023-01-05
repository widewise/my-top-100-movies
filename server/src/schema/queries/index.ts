import { GraphQLObjectType } from 'graphql';
import { actorQueries } from "./actor";
import { favoriteQueries } from "./favorite";
import { movieQueries } from "./movie";
import { personQueries } from "./person";
import { rateQueries } from "./rate";
import { userQueries } from "./user";

export const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        ...actorQueries,
        ...favoriteQueries,
        ...movieQueries,
        ...personQueries,
        ...rateQueries,
        ...userQueries,
    }),
})
