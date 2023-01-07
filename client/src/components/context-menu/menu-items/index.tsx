import React, {
    FunctionComponent, useEffect,
    useState,
} from 'react';
import {
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { MovieRate } from "../../movie-rate";
import GradeIcon from '@mui/icons-material/Grade';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { ICheckFavoriteResult } from "../../../models/favorite";

interface Props {
    movieId: string,
    anchorContextEl: HTMLElement | null,
    onClose: () => void;
}

const CHECK_FAVORITE_MOVIE = gql`
query CheckFavoriteMovie($movieId: ID!)
{
  checkFavoriteMovie(movieId: $movieId) {
    isFavorite
  }
}
`;

const ADD_FAVORITE_MOVIE = gql`
mutation AddFavoriteMovie($movieId: ID!) {
  addFavoriteMovie(movieId: $movieId) {
    id
  }
}
`;

const REMOVE_FAVORITE_MOVIE = gql`
mutation RemoveFavoriteMovie($movieId: ID!) {
  removeFavoriteMovie(movieId: $movieId) {
    id
  }
}
`;

export const ContextMenuItems: FunctionComponent<Props> = ({
    movieId,
    anchorContextEl,
    onClose,
}: Props) => {
    const [anchorRateEl, setAnchorRateEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorContextEl);
    const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
    const { loading, data } = useQuery<ICheckFavoriteResult>(
        CHECK_FAVORITE_MOVIE,
        {
            initialFetchPolicy: "no-cache",
            variables: { movieId } });

    useEffect(() => {
        if(!loading) {
            setIsFavorite(data?.checkFavoriteMovie?.isFavorite ?? false);
        } else {
            setIsFavorite(null);
        }
    }, [loading]);

    const [addFavorite] = useMutation(ADD_FAVORITE_MOVIE);
    const [removeFavorite] = useMutation(REMOVE_FAVORITE_MOVIE);

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, operation: string) => {
        switch (operation){
            case "rate":
                setAnchorRateEl(event.currentTarget);
                break
            case "add-favorite":
                addFavorite({ variables: { movieId }});
                setIsFavorite(true);
                onClose();
                break
            case "remove-favorite":
                removeFavorite({ variables: { movieId }});
                setIsFavorite(false);
                onClose();
                break
        }
        event.stopPropagation();
    };

    return (<>
        {anchorRateEl && <MovieRate
            movieId={movieId}
            anchorEl={anchorRateEl}
            onClose={() => onClose()}
        />}
        {loading ? <p>Loading ... </p>: (<Menu
            id="context-menu"
            aria-labelledby="context-menu-button"
            anchorEl={anchorContextEl}
            open={open}
            onClose={handleMenuItemClick}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            {isFavorite !== null && !isFavorite && <MenuItem onClick={(e) => handleMenuItemClick(e, "add-favorite")}>
                <FavoriteBorderIcon fontSize={"small"} />
                <Typography variant="inherit">Add to favorite</Typography>
            </MenuItem>}
            {isFavorite !== null && isFavorite && <MenuItem onClick={(e) => handleMenuItemClick(e, "remove-favorite")}>
                <FavoriteIcon fontSize={"small"} />
                <Typography variant="inherit">Remove from favorite</Typography>
            </MenuItem>}
            <MenuItem onClick={(e) => handleMenuItemClick(e, "rate")}>
                <GradeIcon fontSize={"small"} />
                <Typography variant="inherit">Your rating</Typography>
            </MenuItem>
        </Menu>)}
    </>);
};
