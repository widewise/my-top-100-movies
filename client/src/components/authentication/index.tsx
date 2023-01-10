import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../hooks/useLoginMutation";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    AlertTitle,
    Button,
    FormControl,
    TextField,
    Typography,
} from "@mui/material";

export const Authentication = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [loginMutation] = useLoginMutation();

    const onSubmit = (data: any) => {
        // @ts-ignore
        loginMutation(data.login,data.password)
            .then(() => navigate("/"))
            .catch((reason: any) => setErrorMessage(reason.message));
    }

    return (
        <div style={{ margin: "auto", padding: "100px" }}>
            <FormControl sx={{ width: '300px' }}>
                {errorMessage && <Alert
                    severity="error"
                    sx={{ marginBottom: 4}}
                    onClose={() => setErrorMessage("")}
                >
                    <AlertTitle>Login error</AlertTitle>
                    {errorMessage}
                </Alert>}
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
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    sx={{
                        maxWidth: 100,
                        marginTop: 2
                    }}>
                    Login
                </Button>
            </FormControl>
        </div>
    );
};