import * as React from "react";
import {
    FunctionComponent,
    useCallback,
} from "react";
import { IActor } from "../../../../models/actor";
import {
    Card,
    CardMedia,
    Link,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ActorDetailsPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
    actor: IActor
}

export const ActorCard: FunctionComponent<IProps> = ({ actor }: IProps) => {
    const navigate = useNavigate();

    const onPhotoClick = useCallback(() => {
        navigate(`/person/${actor.person.id}`);
    }, []);

    return (<Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: 140,
                height: 300,
            }}
        >
        <CardMedia
            component="img"
            sx={{ width: 140 }}
            image={actor.person.photoUrl ?? ''}
            alt="No photo"
            onClick={onPhotoClick}
        />
        <ActorDetailsPanel>
            <Link
                href={`/person/${actor.person.id}`}
                underline="none"
                color="inherit"
                sx={{ fontWeight: "600" }}
            >
                {actor.person.name}
            </Link>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                component="p"
            >
                {actor.role}
            </Typography>
        </ActorDetailsPanel>
    </Card>);
}