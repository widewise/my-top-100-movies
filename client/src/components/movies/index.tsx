import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { useQuery, gql } from '@apollo/client';
import { IMovieListItem, IMoviesResult } from "../../models/movie";
import { MovieCard } from "./movie-card";
import {Button, Grid, TextField} from "@mui/material";
import { mergeArrays } from "../../utils/mergeArrays";
import { ShowSearchContext } from "../App";
import debounce from 'lodash.debounce';

const GET_MOVIES = gql`
  query GetMovies($search: String, $offset: Int!, $limit: Int!) {
    movies(search: $search, offset: $offset, limit: $limit) {
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
    const showSearchContext = useContext(ShowSearchContext);
    const [search, setSearch] = useState<string | null>(null)

    const { loading, data, fetchMore } = useQuery<IMoviesResult>(
        GET_MOVIES,{
            fetchPolicy: "network-only",
            variables: {
                search: search,
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
                search,
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

    const changeHandler = (event: any) => {
        setSearch(event.target.value);
    };
    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 1000)
        , []);

    return (<>
        {showSearchContext && <TextField
            sx={{ width: "150vh" }}
            placeholder="Please enter search value ..."
            onChange={debouncedChangeHandler}
        />}
        <Grid mx={5} mt={1} container rowSpacing={4} columns={{ xs: 4, sm: 6, md: 12 }}>
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
                          marginX: "35%",
                          width: '50%'
                  }}>
                      Show more
                  </Button>}
              </>
          }
        </Grid>
    </>);
}