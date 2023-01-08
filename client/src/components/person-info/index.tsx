import React, {useState} from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { useUserType } from "../../hooks/useUserType";
import { usePersonQuery } from "../../hooks/usePersonQuery";
import styled from "styled-components";
import {
    Alert,
    Box,
    IconButton,
    Snackbar,
    Typography,
} from "@mui/material";
import { PersonAttribute } from "./attribute";
import { PersonMoviesList } from "./movies-list";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PersonPhotoImage = styled.img`
  height: 450px;
  width: auto;
  max-width: 300px;
  margin: 0 15px 15px 0;
  border-radius: 15px;
`;

const PersonInformationContainer = styled.div`
  display: flex;
  padding: 20px;
`;

type ExtraProps = {
    variant?: React.ElementType;
    component: React.ElementType;
};

const MainInformationField = styled(Typography)<ExtraProps>`
  text-align: left;
`;

const PersonNameField = styled(MainInformationField)`
  font-weight: bold;
`;


const DELETE_PERSON = gql`
mutation DeletePerson($personId: ID!) {
    removePerson(personId: $personId) {
        id
    }
}
`;

export const PersonInfo = () => {
    const { personId } = useParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const { loadingPerson, person } = usePersonQuery(personId ?? "");
    const [userType] = useUserType();
    const [deletePerson] = useMutation(DELETE_PERSON);

    const handleOperationClick = (event: React.MouseEvent<HTMLElement>, operation: string) => {
        switch (operation){
            case "edit":
                navigate(`/person/${personId}/edit`);
                break;
            case "delete":
                deletePerson({ variables: { personId } })
                    .then(() => navigate("/"))
                    .catch((reason: any) => setErrorMessage(reason.message));
                break;
        }
        event.stopPropagation();
    };

    const handleClose = () => {
        setErrorMessage("");
    };

    return (<>
        <Snackbar open={errorMessage.length > 0} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
        {loadingPerson || !person ? (<p>Loading person...</p>) : (
            <PersonInformationContainer>
                <Box ml={4}>
                    <PersonPhotoImage src={person?.photoUrl ?? ''} alt="Photo" />
                    <Box>
                        <Typography
                            variant="h5"
                            component="h5"
                            mt={3}
                            textAlign={"left"}
                            sx={{fontWeight: '500'}}
                        >
                            Personal Info
                        </Typography>
                        <PersonAttribute label='Gender' value={person?.gender} />
                        <PersonAttribute label='Birthday' value={person?.birthdate?.toString()} />
                        <PersonAttribute label='Place of Birth' value={person?.birthplace} />
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PersonNameField variant="h4" component="h4">
                            {person?.name}
                        </PersonNameField>
                        {userType === "admin" &&<>
                            <IconButton
                                sx={{ marginLeft: 1 }}
                                onClick={(e) => handleOperationClick(e, "edit")}
                                color="inherit"
                            >
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton
                                sx={{ marginLeft: 1 }}
                                onClick={(e) => handleOperationClick(e, "delete")}
                                color="inherit"
                            >
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </>}
                    </Box>
                    <MainInformationField variant="h5" component="h5" mt={2}>
                        Biography
                    </MainInformationField>
                    <MainInformationField component="p">
                        {person?.biography}
                    </MainInformationField>
                    { personId ? <>
                        <MainInformationField variant="h5" component="h5" mt={2}>
                            Known For
                        </MainInformationField>
                        <PersonMoviesList personId={personId} />
                    </> : null}
                </Box>
            </PersonInformationContainer>)}
    </>);
}