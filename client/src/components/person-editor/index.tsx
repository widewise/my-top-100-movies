import React, { useState } from "react";
import styled from "styled-components";
import {
    Alert,
    AlertTitle,
    Button,
    FormControl,
    InputLabel,
    Select,
    TextField,
} from "@mui/material";
import { useParams } from "react-router";
import { IMessage } from "../../models/common";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { usePersonQuery } from "../../hooks/usePersonQuery";
import { EGender } from "../../models/person";

const CREATE_PERSON = gql`
mutation CreatePerson($createPersonInput: CreatePersonInputType!) {
    createPerson(input: $createPersonInput) {
        id
    }
}
`;

const UPDATE_PERSON = gql`
mutation UpdatePerson($updatePersonInput: InputPersonType!) {
    updatePerson(input: $updatePersonInput) {
        id
    }
}
`;

const FormContainer = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

export const PersonEditor = () => {
    const { personId } = useParams();
    const navigate = useNavigate();
    const [ message, setMessage ] = useState<IMessage>();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { loadingPerson, person } = usePersonQuery(personId || "");
    const [ createPerson ] = useMutation(CREATE_PERSON);
    const [ updatePerson ] = useMutation(UPDATE_PERSON);

    const onSubmit = (data: any) => {
        if(personId) {
            updatePerson({
                variables: {
                    updatePersonInput: {
                        ...data,
                        birthdate: data.birthdate === "" ? null : data.birthdate,
                        id: personId,
                    }
                }
            })
                .then(() => navigate(`/person/${personId}`))
                .catch((err) => setMessage({title: "Edit person", severity: "error", message: err.message}));
        } else {
            createPerson({
                variables: {
                    createPersonInput: {
                        ...data,
                        birthdate: data.birthdate === "" ? null : data.birthdate,
                    }
                }
            })
                .then((data) => navigate(`/person/${data?.data?.createPerson?.id}`))
                .catch((err) => setMessage({title: "Create person", severity: "error", message: err.message}));
        }
    }

    // @ts-ignore
    return (<div style={{ margin: "auto", padding: "10px 35%" }}>
        {loadingPerson || !person
            ? <p>Loading person ...</p>
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
                        defaultValue={person?.name}
                        {...register("name", { required: true, min: 4 })}
                    />
                    {errors.name && <span>This field is required</span>}
                </FormControl>
                <FormControl margin={"normal"}>
                    <InputLabel htmlFor="gender-select">Type</InputLabel>
                    <Select
                        id="gender-select"
                        label="Gender"
                        defaultValue={person?.gender ?? EGender.Male}
                        {...register("gender")}
                    >
                        {Object.values(EGender).map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl margin={"normal"}>
                    <TextField
                        id="birthdate-editor"
                        label="Birth date"
                        type="date"
                        defaultValue={person.birthdate}
                        sx={{ width: 250 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register("birthdate")}
                    />
                </FormControl>
                <FormControl margin={"normal"}>
                    <TextField
                        id="photo-url-edit"
                        label="Photo URL"
                        defaultValue={person?.photoUrl}
                        {...register("photoUrl")}
                    />
                </FormControl>
                <FormControl margin={"normal"}>
                    <TextField
                        id="birthplace-url-edit"
                        label="Birth place"
                        defaultValue={person?.birthplace}
                        {...register("birthplace")}
                    />
                </FormControl>
                <FormControl margin={"normal"}>
                    <TextField
                        id="biography-edit"
                        label="Biography"
                        multiline
                        rows={7}
                        defaultValue={person?.biography}
                        {...register("biography")}
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
    </div>);
}