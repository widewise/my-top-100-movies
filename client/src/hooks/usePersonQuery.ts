import { gql, useQuery } from "@apollo/client";
import { IPersonResult } from "../models/person";

const GET_PERSON = gql`
query GetPersonById($personId: ID!)
{
    personById(personId: $personId) {
        id
        name
        gender
        biography
        birthdate
        birthplace
        photoUrl
    }
}
`;

export const usePersonQuery = (personId: string) => {
    const { loading: loadingPerson, data: personData } = useQuery<IPersonResult>(
        GET_PERSON,
        {
            fetchPolicy: "network-only",
            nextFetchPolicy: "network-only",
            variables: {
                personId
            }
        });

    return {
        loadingPerson,
        person: personData?.personById
    };
};