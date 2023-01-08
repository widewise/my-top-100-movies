import React, {
    FunctionComponent,
    useEffect,
    useState,
} from "react";
import {Alert, Box, IconButton, Snackbar} from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { ICheckFavoriteResult } from "../../../models/favorite";
import { useMutation } from "@apollo/react-hooks";
import GradeIcon from '@mui/icons-material/Grade';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MovieRate } from "../../movie-rate";
import { useUserType } from "../../../hooks/useUserType";
import { useNavigate } from "react-router-dom";

interface IProps {
    movieId: string;
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

const DELETE_MOVIE = gql`
mutation DeleteMovie($movieId: ID!) {
    removeMovie(movieId: $movieId) {
        id
    }
}
`;

export const MovieOperations: FunctionComponent<IProps> = ({
    movieId
}:IProps) => {
    const navigate = useNavigate();
    const [anchorRateEl, setAnchorRateEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorRateEl);
    const [errorMessage, setErrorMessage] = useState("");

    const { loading, data } = useQuery<ICheckFavoriteResult>(
        CHECK_FAVORITE_MOVIE,
        {
            initialFetchPolicy: "no-cache",
            variables: { movieId } });
    const [isFavorite, setIsFavorite] = useState<boolean | null>(null);

    useEffect(() => {
        if(!loading) {
            setIsFavorite(data?.checkFavoriteMovie?.isFavorite ?? false);
        } else {
            setIsFavorite(null);
        }
    }, [loading]);

    const [userType] = useUserType();
    const [addFavorite] = useMutation(ADD_FAVORITE_MOVIE);
    const [removeFavorite] = useMutation(REMOVE_FAVORITE_MOVIE);
    const [deleteMovie] = useMutation(DELETE_MOVIE);
    const handleOperationClick = (event: React.MouseEvent<HTMLElement>, operation: string) => {
        switch (operation){
            case "rate":
                setAnchorRateEl(event.currentTarget);
                break
            case "add-favorite":
                addFavorite({ variables: { movieId }});
                setIsFavorite(true);
                break
            case "remove-favorite":
                removeFavorite({ variables: { movieId }});
                setIsFavorite(false);
                break
            case "edit":
                navigate(`/movie/${movieId}/edit`);
                break;
            case "delete":
                deleteMovie({ variables: { movieId } })
                    .then(() => navigate("/"))
                    .catch((reason: any) => setErrorMessage(reason.message));
                break;
        }
        event.stopPropagation();
    };

    const handleClose = () => {
        setErrorMessage("");
    };

    return (<Box mt={2} ml={2}
         sx={{
             display: 'flex',
             alignItems: 'center'
         }}>
        <Snackbar open={errorMessage.length > 0} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
        {anchorRateEl && <MovieRate
            movieId={movieId}
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
        {userType === "admin" &&<>
            <IconButton
                onClick={(e) => handleOperationClick(e, "edit")}
                color="inherit"
            >
                <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
                onClick={(e) => handleOperationClick(e, "delete")}
                color="inherit"
            >
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </>}
    </Box>);
}