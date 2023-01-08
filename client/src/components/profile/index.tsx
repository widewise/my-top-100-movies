import React, { useState } from "react";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardHeader,
    FormControl, IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { gql, useQuery } from "@apollo/client";
import { AlertColor } from "@mui/material/Alert/Alert";
import { IUserResult } from "../../models/user";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../../hooks/useAuthToken";
import styled from "styled-components";
import {useLoginMutation} from "../../hooks/useLoginMutation";

const GET_PROFILE = gql`
query Profile {
    profile {
        type
        login
        email
        description
    }
}
`;

const UPDATE_USER = gql`
mutation UpdateUser($updateUserInput:  EditUserInputType!) {
    updateUser(input: $updateUserInput) {
        id
    }
}
`;

const DELETE_USER = gql`
mutation DeleteUser {
    deleteUser {
        id
    }
}
`;

const ChangePasswordTitle = styled(Typography)`
  && {
    font-size: 10px;
  }
`;

interface IMessage {
    title: string;
    severity: AlertColor;
    message: string;
}

export const Profile = () => {
    const [ message, setMessage ] = useState<IMessage>();
    const { handleSubmit, register, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [ _, removeAuthToken ] = useAuthToken();
    const [ loginMutation ] = useLoginMutation();
    const { loading, data } = useQuery<IUserResult>(GET_PROFILE);
    const profile = data?.profile;
    const [ updateUser ] = useMutation(UPDATE_USER);
    const [ deleteUser ] = useMutation(DELETE_USER);

    const onSubmit = (data: any) => {
        updateUser({ variables: { updateUserInput: {
                    oldPassword: data.oldPassword,
                    password: data.password,
                    email: data.email,
                    description: data.description,
                }
            }
        })
        .then(() => {
            if (profile) {
                // @ts-ignore
                loginMutation(profile.login, data.password)
                    .catch((err: any) => setMessage({title: "Login user", severity: "error", message: err.message}));
            }
            setMessage({title: "Edit user", severity: "success", message: "User saved"});
        })
        .catch((err) => setMessage({title: "Edit user", severity: "error", message: err.message}));
    }

    const handleDeleteClick = () => {
        deleteUser()
            .then(() => {
                removeAuthToken();
                navigate("/");
            })
            .catch((err) => setMessage({title: "Delete user", severity: "error", message: err.message}));
    }

    return (<div style={{ margin: "auto", padding: "100px" }}>
        {loading || !data
            ? <p>Loading actors...</p>
            : <FormControl sx={{ width: '300px' }}
        >
            {message?.message && <Alert
                severity={message.severity}
                sx={{ marginBottom: 4}}
                onClose={() => setMessage({title: "", severity: "info", message: ""})}
            >
                <AlertTitle>{message.title}</AlertTitle>
                {message.message}
            </Alert>}
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="h5"
                        component="h5"
                    >
                        {profile?.login} ({profile?.type})
                    </Typography>
                </Box>
                <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </Box>
            {errors.login && <span>This field is required</span>}
            <Card
                variant="outlined"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 2,
                    height: 320,
                }}>
                <CardHeader
                    component={ChangePasswordTitle}
                    title={"Change password"}
                />
                <TextField
                    required
                    margin={"normal"}
                    id="old-password-edit"
                    label="Old password"
                    type="password"
                    {...register("oldPassword", {
                        min: 3,
                        validate: (val: string) => {
                            if (watch('password') && !val) {
                                return "You need enter old password";
                            }
                        },
                    })}
                />
                {errors.oldPassword && <span>You need enter old password</span>}
                <TextField
                    required
                    margin={"normal"}
                    id="password-edit"
                    label="Password"
                    type="password"
                    {...register("password", { min: 3 })}
                />
                {errors.password && <span>Min length 3 characters</span>}
                <TextField
                    required
                    margin={"normal"}
                    id="confirm-password-edit"
                    label="Confirm password"
                    type="password"
                    {...register("confirmPassword", {
                        min: 3,
                        validate: (val: string) => {
                            if (watch('password') != val) {
                                return "Your passwords do no match";
                            }
                        },
                    })
                    }
                />
                {errors.confirmPassword && <span>Your passwords do no match</span>}
            </Card>
            <TextField
                id="email-edit"
                margin={"normal"}
                label="Email"
                defaultValue={profile?.email}
                {
                    ...register(
                        "email", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i
                        })
                }
            />
            {errors.email && <span>This field is required</span>}
            <TextField
                id="description-edit"
                margin={"normal"}
                label="Description"
                defaultValue={profile?.description}
                {...register("description")}
            />
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
        </FormControl>}
    </div>);
}