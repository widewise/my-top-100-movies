import { gql, useQuery } from "@apollo/client";
import { IActorsResult } from "../models/actor";

const GET_ACTORS_BY_ID = gql`
    query GetActorsById($movieId: ID!)
    {
        actorsByMovieId(movieId: $movieId) {
            id
            person {
                id
                name
                photoUrl
            }
            role
        }
    }
`;

export const useActorsByMovieIdQuery = (
    movieId: string,
) => {
    const { loading, data, refetch } = useQuery<IActorsResult>(
        GET_ACTORS_BY_ID,
        {
            fetchPolicy: "network-only",
            nextFetchPolicy: "network-only",
            variables: {
                movieId: movieId
            }
        });

    return {
        loadingActors: loading,
        actors: data?.actorsByMovieId,
        refetch
    };
};