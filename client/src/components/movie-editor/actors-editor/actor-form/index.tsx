import React, {
    FunctionComponent,
    useState,
} from "react";
import {
    Alert,
    AlertTitle,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Typography,
    Autocomplete,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { IPersonDictionaryResult } from "../../../../models/person";

const PERSONS_TO_ADD_TO_MOVIE = gql`
query PersonsToAddToMovie($movieId: ID!)
{
    personsToAddToMovie(movieId: $movieId) {
        id
        name
    }
}
`;

const ADD_ACTOR_TO_MOVIE = gql`
    mutation AddActorToMovie($addActorInput: AddActorToMovieInputType!) {
        addActorToMovie(input: $addActorInput) {
            id
        }
    }
`;

interface IProps {
    movieId: string;
    open: boolean;
    onClose: () => void;
}

export const ActorForm: FunctionComponent<IProps> = ({
    movieId,
    open,
    onClose,
}: IProps) => {
    const [errorMessage, setErrorMessage] = useState("");
    const { handleSubmit, register, control, formState: { errors } } = useForm();
    const { loading, data } = useQuery<IPersonDictionaryResult>(
        PERSONS_TO_ADD_TO_MOVIE,
        {
            fetchPolicy: "network-only",
            nextFetchPolicy: "network-only",
            variables: {
                movieId: movieId
            }
        });
    const persons = data?.personsToAddToMovie.map(p => ({ label: p.name, value: p.id}));
    const [ addActorToMovie ] = useMutation(ADD_ACTOR_TO_MOVIE);

    const onSubmit = (data: any) => {
        addActorToMovie({
            variables: {
                addActorInput: {
                    movieId,
                    personId: data.personId,
                    role: data.role,
                }
            }
        })
        .then(() => onClose())
        .catch((reason: any) => setErrorMessage(reason.message));
    }

    // @ts-ignore
    return (<Dialog open={open} onClose={onClose}>
        <DialogTitle>Add actor</DialogTitle>
        {errorMessage && <Alert
            severity="error"
            sx={{ marginBottom: 4}}
            onClose={() => setErrorMessage("")}
        >
            <AlertTitle>Add actor error</AlertTitle>
            {errorMessage}
        </Alert>}
        {loading
            ? <p> Loading persons ... </p>
            : <DialogContent sx={{
                display: "flex",
                flexDirection: "column",
                width: '400px',
            }}>
            {persons && <FormControl margin={"normal"}>
                <Controller
                    name="personId"
                    control={control}
                    rules={{ required: true }}
                    render={({field:{ref, onChange, ...field}}) => (
                        <Autocomplete
                            disablePortal
                            id="person-select"
                            options={persons}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            getOptionLabel={(option) => option.label}
                            onChange={(_, data) => onChange(data?.value)}
                            renderInput={(params) =>
                                <TextField
                                    label="Person"
                                    {...field}
                                    {...params}
                                    inputRef={ref}
                                />}
                        />
                    )}
                />
                {errors.personId && <span>This field is required</span>}
            </FormControl>}
            <FormControl margin={"normal"}>
                <TextField
                    required
                    id="role-edit"
                    label="Role"
                    {...register("role", { required: true, min: 3 })}
                />
                {errors.password && <Typography>This field is required</Typography>}
            </FormControl>
            <DialogActions>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}>
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </DialogContent>}
    </Dialog>);
}