import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../hooks/useLoginMutation";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
import {
    Alert, AlertTitle,
    Button,
    FormControl,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const REGISTRATION = gql`
mutation Registration($registrationInput: RegistrationInputType!) {
    registration(input: $registrationInput) {
        id
    }
}
`;
export const Registration = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [loginMutation] = useLoginMutation();
    const [registration] = useMutation(REGISTRATION);

    const onSubmit = (data: any) => {
        registration({ variables: { registrationInput: {
                    login: data.login,
                    password: data.password,
                    type: data.type,
                    email: data.email
                }
            }
        })
        // @ts-ignore
        .then(() => loginMutation(data.login,data.password).then(() => navigate("/")))
        .catch((err) => setErrorMessage(err.message));
    }

    return (
        <div style={{ margin: "auto", padding: "100px" }}>
            <FormControl sx={{ width: '300px' }}
            >
                {errorMessage && <Alert
                    severity="error"
                    sx={{ marginBottom: 4}}
                    onClose={() => setErrorMessage("")}
                >
                    <AlertTitle>Registration error</AlertTitle>
                    {errorMessage}
                </Alert>}
                <Select
                    id="type-select"
                    defaultValue="User"
                    {...register("type")}
                >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                </Select>
                <TextField
                    required
                    margin={"normal"}
                    id="login-edit"
                    label="Login"
                    {...register("login", { required: true, min: 4 })}
                />
                {errors.login && <span>This field is required</span>}
                <TextField
                    required
                    margin={"normal"}
                    id="password-edit"
                    label="Password"
                    type="password"
                    {...register("password", { required: true, min: 3 })}
                />
                {errors.password && <Typography>This field is required</Typography>}
                <TextField
                    required
                    margin={"normal"}
                    id="confirm-password-edit"
                    label="Confirm password"
                    type="password"
                    {...register("confirmPassword", { required: true, min: 3 })}
                />
                {errors.confirmPassword && <span>This field is required</span>}
                <TextField
                    id="email-edit"
                    margin={"normal"}
                    label="Email"
                    {
                        ...register(
                            "email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i
                            })
                    }
                />
                {errors.email && <span>This field is required</span>}
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    sx={{
                        maxWidth: 100,
                        marginTop: 2
                }}>
                    Register
                </Button>
            </FormControl>
        </div>
    );
};