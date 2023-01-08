import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLEnumType,
    GraphQLID,
} from 'graphql';
import {
    GraphQLDate
} from '../scalars/date';
import {EGender} from "../../data/person";

const GenderType = new GraphQLEnumType({
    name: 'GenderType',
    values: {
        Female: { value: EGender.Female  },
        Male: { value: EGender.Male },
    }
});

const personFields = {
    id: {
        type: new GraphQLNonNull(GraphQLID),
    },
    name: {
        type: new GraphQLNonNull(GraphQLString),
    },
    gender: {
        type: new GraphQLNonNull(GenderType),
    },
    biography: {
        type: GraphQLString
    },
    birthdate: {
        type: GraphQLDate,
    },
    birthplace: {
        type: GraphQLString,
    },
    photoUrl: {
        type: GraphQLString,
    },
}

export const PersonType = new GraphQLObjectType({
    name: 'PersonType',
    description: 'Person',
    fields: () => ({
        ...personFields,
    }),
});

export const InputPersonType = new GraphQLInputObjectType({
    name: 'InputPersonType',
    description: 'Input person',
    fields: () => ({
        ...personFields,
    }),
});

export const CreatePersonInputType = new GraphQLInputObjectType({
    name: 'CreatePersonInputType',
    description: 'Create person payload definition',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        gender: {
            type: new GraphQLNonNull(GenderType),
        },
        biography: {
            type: GraphQLString
        },
        birthdate: {
            type: GraphQLDate,
        },
        birthplace: {
            type: GraphQLString,
        },
        photoUrl: {
            type: GraphQLString,
        },
    }),
});