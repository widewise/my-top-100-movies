import {
    FunctionComponent,
    useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { IMovieListItem } from "../../../../models/movie";
import styled from "styled-components";
import { ContextMenu, ContextMenuPanel } from "../../../context-menu";
import { CardMedia } from "@mui/material";
import {useAuthToken} from "../../../../hooks/useAuthToken";

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
    const navigate = useNavigate();
    const [authToken] = useAuthToken();

    const onPosterClick = useCallback(() => {
        navigate(`/movie/${movie.id}`);
    }, []);

    return (
        <MoviePosterPanel
            tabIndex={0}
            onClick={() => onPosterClick()}
        >
            {authToken && authToken !== "undefined" && <ContextMenu movie={movie} />}
            <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={movie.posterUrl ?? ''}
                alt="No poster"
            />
        </MoviePosterPanel>
    );
};