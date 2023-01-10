import React, {FunctionComponent, useState} from "react";
import { useActorsByMovieIdQuery } from "../../../hooks/useActorsByMovieIdQuery";
import {
    Alert, AlertTitle,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {gql} from "@apollo/client";
import {useMutation} from "@apollo/react-hooks";
import {ActorForm} from "./actor-form";

const REMOVE_ACTOR_FROM_MOVIE = gql`
    mutation RemoveActorFromMovie($actorId: ID!) {
        removeActorFromMovie(actorId: $actorId) {
            id
        }
    }
`;

interface IProps {
    movieId: string;
}

export const ActorsEditor: FunctionComponent<IProps> = ({
    movieId,
}: IProps) => {
    const { loadingActors, actors, refetch } = useActorsByMovieIdQuery(movieId);
    const [ removeActorFromMovie ] = useMutation(REMOVE_ACTOR_FROM_MOVIE);
    const [errorMessage, setErrorMessage] = useState("");
    const [openAddActor, setOpenAddActor] = useState(false);

    const handleAddActorClick = () => {
        setOpenAddActor(true);
    };

    const handleCloseAddActor = () => {
        setOpenAddActor(false);
        refetch();
    };

    const handleRemoveActorClick = (actorId: string) => {
        removeActorFromMovie({ variables: { actorId } })
            .then(() => refetch())
            .catch((err) => setErrorMessage(err.message));
    };

    return (<>
        {errorMessage && <Alert
            severity="error"
            sx={{ marginBottom: 4}}
            onClose={() => setErrorMessage("")}
        >
            <AlertTitle>Actor operation error</AlertTitle>
            {errorMessage}
        </Alert>}
        {openAddActor && <ActorForm
            movieId={movieId}
            open={openAddActor}
            onClose={handleCloseAddActor}
        />}
        {loadingActors || !actors
            ? <p>Loading actors...</p>
            : <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell align="right">
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddActorClick}
                        >
                            Add
                        </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {actors.map((actor) => (
                        <TableRow
                            key={actor.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {actor.person.name}
                            </TableCell>
                            <TableCell>{actor.role}</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleRemoveActorClick(actor.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        }
    </>);
}