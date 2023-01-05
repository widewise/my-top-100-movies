import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import 'react-multi-carousel/lib/styles.css';
import { gql, useQuery } from "@apollo/client";
import { IMovieResult } from "../../models/movie";
import { MovieType } from "./movie-type";
import { fmtDuration} from "../../utils/duration";
import { Box, Typography } from "@mui/material";
import LensIcon from '@mui/icons-material/Lens';
import { ActorsList } from "./actors-list";
import {MovieOperations} from "./operations";

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

const MoviePosterImage = styled.img`
  height: 320px;
  width: auto;
  max-width: 220px;
  margin: 0 15px 15px 45px;
  border-radius: 0 0 5px 5px;
`;

export const MovieInfo = () => {
    const { movieId } = useParams();
    const { loading: loadingMovie, data: movieData } = useQuery<IMovieResult>(
        GET_MOVIE,
        { variables: { movieId: movieId } });
    const movie = movieData?.movieById;
    return (<div>
        {loadingMovie || !movieData ? (<p>Loading movie ...</p>) : (
            <Box component="div" sx={{
                display: 'flex',
                p: 2,
                background: '#051f3d',
                color: 'white',
                margin: 0,
                padding: 0
            }}>
                <MoviePosterImage
                    width="100%"
                    height="auto"
                    src={movie?.posterUrl ?? ''}
                    alt="Poster"
                />
                <Box component="div" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}>
                    <Typography
                        variant="h4"
                        component="h4"
                        mt={3}
                    >
                        {movie?.name} ({movie?.year})
                    </Typography>
                    <Box mt={2} ml={2}
                         sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <MovieType value={movie?.type ?? "Movie"} />
                        <Typography
                            component="p"
                            sx={{
                                margin: '0 0 0 10px'
                        }}>
                            {movie?.genres.join(", ")}
                        </Typography>
                        <LensIcon fontSize={"small"} />
                        <Typography
                            component="p"
                            sx={{
                                margin: '0 0 0 10px'
                            }}>
                            {fmtDuration(movie?.duration ?? 0)}
                        </Typography>
                    </Box>
                    { movieId ? <MovieOperations movieId={movieId} /> : null}
                    <Typography
                        variant="h5"
                        component="h5"
                        mt={3}
                    >
                        Overview
                    </Typography>
                    <Typography
                        component="p"
                        textAlign={"left"}
                    >
                        {movie?.description}
                    </Typography>
                </Box>
            </Box>)}
        { movieId ? <ActorsList movieId={movieId} /> : null}
    </div>);
}