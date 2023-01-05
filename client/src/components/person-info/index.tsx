import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { IPersonResult } from "../../models/person";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { PersonAttribute } from "./attribute";
import { PersonMoviesList } from "./movies-list";

const GET_PERSON = gql`
  query GetPersonById($personId: ID!)
  {
    personById(personId: $personId) {
      id
      name
      gender
      biography
      birthdate
      birthplace
     photoUrl
  }
}`;

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

export const PersonInfo = () => {
    const { personId } = useParams();
    const { loading, data } = useQuery<IPersonResult>(
        GET_PERSON,
        { variables: { personId: personId } });
    const person = data?.personById;
    return (<>
        {loading || !data ? (<p>Loading person...</p>) : (
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
                    <PersonNameField variant="h4" component="h4" mt={2}>
                        {person?.name}
                    </PersonNameField>
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