import { gql, useQuery } from "@apollo/client";
import { IMovieResult } from "../models/movie";

const GET_MOVIE = gql`
    query GetMovieById($movieId: ID!) {
        movieById(movieId: $movieId) {
            id
            name
            type
            genres
            year
            totalScore
            duration
            description
            posterUrl
        }
    }
`;
export const useMovieQuery = (movieId: string) => {
    const { loading: loadingMovie, data: movieData } = useQuery<IMovieResult>(
        GET_MOVIE,
        {
            fetchPolicy: "network-only",
            nextFetchPolicy: "network-only",
            variables: {
                movieId: movieId
            }
        });

    return {
        loadingMovie,
        movie: movieData?.movieById
    };
};