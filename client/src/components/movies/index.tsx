import * as React from "react";
import { useQuery, gql } from '@apollo/client';
import { IMovieListItem, IMoviesResult } from "../../models/movie";
import { MovieCard } from "./movie-card";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { mergeArrays } from "../../utils/mergeArrays";

const GET_MOVIES = gql`
  query GetMovies($offset: Int!, $limit: Int!) {
    movies(offset: $offset, limit: $limit) {
        id
        name
        year
        totalScore
        posterUrl
    }
  }
`;

export const Movies = () => {
    const [showMore, setShowMore] = useState(true);
    const [offset,  setOffset] = useState(6);

    const { loading, data, fetchMore } = useQuery<IMoviesResult>(
        GET_MOVIES,{
            fetchPolicy: "network-only",
            variables: {
                offset: 0,
                limit: 12
            }
        }
    );

    const handleShowMoreClick = () => {
        const newOffset = offset + 6;
        setOffset(newOffset);
        fetchMore({
            variables: {
                offset: newOffset,
                limit: 6
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                    return prevResult;
                }
                return {
                    ...prevResult,
                    movies: mergeArrays<IMovieListItem>(
                        prevResult.movies,
                        fetchMoreResult.movies,
                            x=> x.id)
                }
            },
        }).then((d) => {
            if(d.data.movies.length === 0 ) {
                setShowMore(false);
            }
        })
    }

    return (<Grid mx={5} mt={1} container rowSpacing={4} columns={{ xs: 4, sm: 6, md: 12 }}>
      {loading || !data
          ? (<p>Loading...</p>)
          : <>
              {data.movies.map((movie: IMovieListItem) => (
                <Grid item xs={2} sm={2} md={2} key={movie.id}>
                    <MovieCard movie={movie} />
                </Grid>))
              }
              {showMore && <Button
                  type="submit"
                  variant="contained"
                  onClick={handleShowMoreClick}
                  sx={{
                      marginTop: 2,
                      width: '100%'
              }}>
                  Show more
              </Button>}
          </>
      }
    </Grid>);
}