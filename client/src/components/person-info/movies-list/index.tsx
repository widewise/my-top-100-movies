import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { PersonMovieCard } from "./movie-card";
import { gql, useQuery } from "@apollo/client";
import { IMoviesListResult } from "../../../models/actor";

const GET_ACTORS_BY_ID = gql`
query GetMoviesByPersonId($personId: ID!)
{
  moviesByPersonId(personId: $personId) {
    id
    movie {
      id
      name
      posterUrl
    }
    role
  }
}
`;

const MoviesListContainer = styled.div`
  margin-top: 20px;
  .react-multi-carousel-item {
    margin-left: 5px;
    padding-bottom: 5px;
  }
`;

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

interface IProps {
    personId: string;
}

export const PersonMoviesList: FunctionComponent<IProps> = ({ personId }: IProps) => {
    const { loading, data } = useQuery<IMoviesListResult>(
        GET_ACTORS_BY_ID,
        { variables: { personId: personId } });
    const movies = data?.moviesByPersonId;

    return (<>
        {loading || !data
            ? (<p>Loading person movies...</p>)
            : (<MoviesListContainer>
                <Carousel responsive={responsive}>
                    {
                        movies?.map(movie => <PersonMovieCard key={movie.id} movie={movie} />)
                    }
                </Carousel>
            </MoviesListContainer>)
        }
    </>);
}