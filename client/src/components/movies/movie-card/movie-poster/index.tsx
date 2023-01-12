import { FunctionComponent } from "react";
import { IMovieListItem } from "../../../../models/movie";
import styled from "styled-components";
import { ContextMenu, ContextMenuPanel } from "../../../context-menu";
import { CardActionArea, CardMedia } from "@mui/material";
import { useAuthToken } from "../../../../hooks/useAuthToken";

const MoviePosterPanel = styled.div`
    position: relative;
    :hover .${ContextMenuPanel.styledComponentId},
    :focus-within .${ContextMenuPanel.styledComponentId} {
        opacity: 1;
    }
`;

interface IProps {
    movie: IMovieListItem,
}

export const MoviePoster: FunctionComponent<IProps> = ({ movie }: IProps) => {
    const [authToken] = useAuthToken();

    return (
        <MoviePosterPanel tabIndex={0}>
            {authToken && authToken !== "undefined" && <ContextMenu movie={movie} />}
            <CardActionArea href={`/movie/${movie.id}`}>
                <CardMedia
                    component="img"
                    sx={{ width: 150, height: 225 }}
                    image={movie.posterUrl ?? ''}
                    alt="No poster"
                />
            </CardActionArea>
        </MoviePosterPanel>
    );
};