import * as React from "react";
import { useQuery, gql } from '@apollo/client';
import { IMovieListItem, IMoviesResult } from "../../models/movie";
import { MovieCard } from "./movie-card";
import { Grid } from "@mui/material";

const GET_MOVIES = gql`
  query GetTop100Movies {
    top100Movies {
        id
        name
        year
        totalScore
        posterUrl
    }
  }
`;

export const Movies = () => {
    const { loading, data } = useQuery<IMoviesResult>(GET_MOVIES);
    return (<Grid mx={5} mt={1} container rowSpacing={4} columns={{ xs: 4, sm: 6, md: 12 }}>
      {loading || !data ? (<p>Loading...</p>) :
        data.top100Movies.map((movie: IMovieListItem) => (
            <Grid item xs={2} sm={2} md={2} key={movie.id}>
                <MovieCard movie={movie} />
            </Grid>))
      }
    </Grid>);
}