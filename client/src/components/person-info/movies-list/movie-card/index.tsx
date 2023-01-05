import * as React from "react";
import {
    FunctionComponent,
    useCallback,
} from "react";
import { IPersonMovie } from "../../../../models/actor";
import {
    Card,
    CardMedia,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MovieDetailsPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
    movie: IPersonMovie
}

export const PersonMovieCard: FunctionComponent<IProps> = ({ movie }: IProps) => {
    console.log({movie});
    const navigate = useNavigate();
    const onPosterClick = useCallback(() => {
        navigate(`/movie/${movie.movie.id}`);
    }, []);

    return (<Card
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: 140,
            height: 300,
        }}
    >
        <CardMedia
            component="img"
            sx={{ width: 140 }}
            image={movie.movie.posterUrl ?? ''}
            alt="No poster"
            onClick={onPosterClick}
        />
        <MovieDetailsPanel>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                component="p"
            >
                {movie.role}
            </Typography>
        </MovieDetailsPanel>
    </Card>);
}