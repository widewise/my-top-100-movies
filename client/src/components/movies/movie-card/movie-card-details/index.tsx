import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IMovieListItem } from '../../../../models/movie';
import {Link, Typography} from "@mui/material";

const MovieDetailsPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 5px 3px;
`;

interface IProps {
    movie: IMovieListItem,
}

export const MovieCardDetails: FunctionComponent<IProps> = ({ movie }: IProps) => (
    <MovieDetailsPanel>
        <Link
            href={`/movie/${movie.id}`}
            underline="none"
            color="inherit"
            sx={{
                fontWeight: "bold",
                overflow: "hidden",
                textOverflow:"ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                maxWidth: 140,
                maxHeight: 60
            }}
        >
            {movie.name}
        </Link>
        <Typography variant="subtitle1" color="text.secondary" component="div">
            {movie.year}
        </Typography>
    </MovieDetailsPanel>
);
