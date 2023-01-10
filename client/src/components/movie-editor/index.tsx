import React, { useState } from "react";
import styled from "styled-components";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    FormControl,
    InputLabel,
    Select, Tab,
    TextField,
} from "@mui/material";
import { useParams } from "react-router";
import { useMovieQuery } from "../../hooks/useMovieQuery";
import { IMessage } from "../../models/common";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import { EMovieGenre, EMovieType } from "../../models/movie";
import { useNavigate } from "react-router-dom";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {ActorsEditor} from "./actors-editor";

const CREATE_MOVIE = gql`
    mutation CreateMovie($createMovieInput: CreateMovieInputType!) {
        createMovie(input: $createMovieInput) {
            id
        }
    }
`;

const UPDATE_MOVIE = gql`
mutation UpdateMovie($updateMovieInput: InputMovieType!) {
    updateMovie(input: $updateMovieInput) {
        id
    }
}
`;

const FormContainer = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

export const MovieEditor = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [ message, setMessage ] = useState<IMessage>();
    const [value, setValue] = React.useState('1');
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { loadingMovie, movie } = useMovieQuery(movieId || "");
    const [ createMovie ] = useMutation(CREATE_MOVIE);
    const [ updateMovie ] = useMutation(UPDATE_MOVIE);

    const onSubmit = (data: any) => {
        if(movieId) {
            updateMovie({
                variables: {
                    updateMovieInput: {
                        ...data,
                        id: movieId,
                        genres: data.genres.split(","),
                        duration: parseInt(data.duration),
                        year: parseInt(data.year),
                    }
                }
            })
                .then(() => navigate(`/movie/${movieId}`))
                .catch((err) => setMessage({title: "Edit movie", severity: "error", message: err.message}));
        } else {
            createMovie({
                variables: {
                    createMovieInput: {
                        ...data,
                        duration: parseInt(data.duration),
                        year: parseInt(data.year),
                    }
                }
            })
                .then((data) => navigate(`/movie/${data?.data?.createMovie?.id}`))
                .catch((err) => setMessage({title: "Create movie", severity: "error", message: err.message}));
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (<Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            {movieId && <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Main info" value="1" />
                    <Tab label="Actors" value="2" />
                </TabList>
            </Box>}
            <TabPanel value="1">
                <div style={{ margin: "auto", padding: "10px 35%" }}>
                    {loadingMovie || !movie
                        ? <p>Loading movie ...</p>
                        : <FormContainer>
                            {message?.message && <Alert
                                severity={message.severity}
                                sx={{ marginBottom: 4}}
                                onClose={() => setMessage({title: "", severity: "info", message: ""})}
                            >
                                <AlertTitle>{message.title}</AlertTitle>
                                {message.message}
                            </Alert>}
                            <FormControl margin={"normal"}>
                                <TextField
                                    required
                                    margin={"normal"}
                                    id="name-edit"
                                    label="Name"
                                    defaultValue={movie?.name}
                                    {...register("name", { required: true, min: 4 })}
                                />
                                {errors.name && <span>This field is required</span>}
                            </FormControl>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor="type-select">Type</InputLabel>
                                <Select
                                    id="type-select"
                                    label="Type"
                                    defaultValue={movie?.type ?? EMovieType.Film}
                                    {...register("type")}
                                >
                                    {Object.values(EMovieType).map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor="type-select">Genres</InputLabel>
                                <Select
                                    id="genres-select"
                                    label="Genres"
                                    defaultValue={movie?.genres.map(g => g.toString()) ?? []}
                                    multiple
                                    {...register("genres")}
                                >
                                    {Object.values(EMovieGenre).map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor="year-select">Year</InputLabel>
                                <Select
                                    id="year-select"
                                    label="Year"
                                    defaultValue={movie?.year ?? 2020}
                                    {...register("year")}
                                >
                                    {Array.from(Array(100)).map((_, i) =>
                                        <MenuItem key={i} value={i + 1940}>{i + 1940}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl margin={"normal"}>
                                <TextField
                                    required
                                    margin={"normal"}
                                    id="duration-edit"
                                    label="Duration"
                                    type="number"
                                    defaultValue={movie?.duration}
                                    {...register("duration", { required: true, min: 1 })}
                                />
                                {errors.duration && <span>This field is required</span>}
                            </FormControl>
                            <FormControl>
                                <TextField
                                    margin={"normal"}
                                    id="poster-edit"
                                    label="Poster URL"
                                    defaultValue={movie?.posterUrl}
                                    {...register("posterUrl")}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    margin={"normal"}
                                    id="description-edit"
                                    label="Description"
                                    multiline
                                    rows={5}
                                    defaultValue={movie?.description}
                                    {...register("description")}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={handleSubmit(onSubmit)}
                                sx={{
                                    maxWidth: 100,
                                    marginTop: 2
                                }}>
                                Save
                            </Button>
                        </FormContainer>}
                </div>
            </TabPanel>
            {movieId && <TabPanel value="2"><ActorsEditor movieId={movieId} /></TabPanel>}
        </TabContext>
    </Box>);
}