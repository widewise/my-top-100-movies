import { IMovieListItem } from "../../../models/movie";
import { FunctionComponent } from "react";
import { MoviePoster } from "./movie-poster";
import { MovieCardDetails } from "./movie-card-details";
import { Card } from "@mui/material";

interface IProps {
    movie: IMovieListItem
}

export const MovieCard: FunctionComponent<IProps> = ({
  movie
}: IProps)  => (<Card
    sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 150,
        height: 320,
    }}
>
    <MoviePoster movie={movie} />
    <MovieCardDetails movie={movie} />
</Card>);