import { GraphQLObjectType,} from 'graphql';
import { userQueries } from "./user";
import { movieQueries } from "./movie";

export const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        ...userQueries,
        ...movieQueries,
    }),
})
