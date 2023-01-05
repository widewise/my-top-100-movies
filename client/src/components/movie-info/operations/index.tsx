import React, {
    FunctionComponent,
    useEffect,
    useState,
} from "react";
import {Box, IconButton} from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { ICheckFavoriteResult } from "../../../models/favorite";
import { useMutation } from "@apollo/react-hooks";
import GradeIcon from '@mui/icons-material/Grade';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MovieRate } from "../../movie-rate";

interface IProps {
    movieId: string;
}

const CHECK_FAVORITE_MOVIE = gql`
query CheckFavoriteMovie($movieId: ID!, $userId: ID!)
{
  checkFavoriteMovie(movieId: $movieId, userId: $userId) {
    isFavorite
  }
}
`;

const ADD_FAVORITE_MOVIE = gql`
mutation AddFavoriteMovie($movieId: ID!,$userId: ID!) {
  addFavoriteMovie(movieId: $movieId, userId: $userId) {
    id
  }
}
`;

const REMOVE_FAVORITE_MOVIE = gql`
mutation RemoveFavoriteMovie($movieId: ID!,$userId: ID!) {
  removeFavoriteMovie(movieId: $movieId, userId: $userId) {
    id
  }
}
`;

export const MovieOperations: FunctionComponent<IProps> = ({
    movieId
}:IProps) => {
    const userId = 'TODO_create_user';
    const [anchorRateEl, setAnchorRateEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorRateEl);

    const { loading, data } = useQuery<ICheckFavoriteResult>(
        CHECK_FAVORITE_MOVIE,
        {
            initialFetchPolicy: "no-cache",
            variables: { movieId, userId } });
    const [isFavorite, setIsFavorite] = useState<boolean | null>(null);

    useEffect(() => {
        if(!loading) {
            setIsFavorite(data?.checkFavoriteMovie?.isFavorite ?? false);
        } else {
            setIsFavorite(null);
        }
    }, [loading]);

    const [addFavorite] = useMutation(ADD_FAVORITE_MOVIE);
    const [removeFavorite] = useMutation(REMOVE_FAVORITE_MOVIE);
    const handleOperationClick = (event: React.MouseEvent<HTMLElement>, operation: string) => {
        switch (operation){
            case "rate":
                setAnchorRateEl(event.currentTarget);
                break
            case "add-favorite":
                addFavorite({ variables: { movieId, userId }});
                setIsFavorite(true);
                break
            case "remove-favorite":
                removeFavorite({ variables: { movieId, userId }});
                setIsFavorite(false);
                break
        }
        event.stopPropagation();
    };
    return (<Box mt={2} ml={2}
         sx={{
             display: 'flex',
             alignItems: 'center'
         }}>
        {anchorRateEl && <MovieRate
            movieId={movieId}
            userId={userId}
            anchorEl={anchorRateEl}
            onClose={() => setAnchorRateEl(null)}
        />}

        {isFavorite !== null && !isFavorite && <IconButton
            onClick={(e) => handleOperationClick(e, "add-favorite")}
            color="inherit"
        >
            <FavoriteBorderIcon fontSize="inherit" />
        </IconButton>}
        {isFavorite !== null && isFavorite && <IconButton
            onClick={(e) => handleOperationClick(e, "remove-favorite")}
            color="inherit"
        >
            <FavoriteIcon fontSize="inherit" />
        </IconButton>}
        <IconButton
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(e) => handleOperationClick(e, "rate")}
            color="inherit"
        >
            <GradeIcon fontSize="inherit" />
        </IconButton>
    </Box>);
}