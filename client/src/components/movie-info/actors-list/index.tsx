import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ActorCard } from "./actor-card";
import { gql, useQuery } from "@apollo/client";
import { IActorsResult } from "../../../models/actor";

const GET_ACTORS_BY_ID = gql`
query GetActorsById($movieId: ID!)
{
  actorsByMovieId(movieId: $movieId) {
    id
    person {
      id
      name
      photoUrl
    }
    role
  }
}
`;

const ActorsListContainer = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  .react-multi-carousel-item {
    margin-left: 5px;
    padding-bottom: 5px;
  }
`;

interface IProps {
    movieId: string;
}

export const ActorsList: FunctionComponent<IProps> = ({ movieId }: IProps) => {
    const { loading: loadingActors, data: actorsData } = useQuery<IActorsResult>(
        GET_ACTORS_BY_ID,
        { variables: { movieId: movieId } });
    const actors = actorsData?.actorsByMovieId;
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 20
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    return (<div>
        {loadingActors || !actorsData
            ? (<p>Loading actors...</p>)
            : (<ActorsListContainer>
                <Carousel responsive={responsive}>
                    {
                        actors?.map(actor => <ActorCard key={actor.id} actor={actor} />)
                    }
                </Carousel>
            </ActorsListContainer>)
        }
    </div>);
}