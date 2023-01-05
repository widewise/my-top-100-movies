import React, {FunctionComponent, useEffect, useState} from "react";
import { Popover, Rating } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { IMovieRateResult } from "../../models/rate";
import { useMutation } from "@apollo/react-hooks";

interface IProps {
    movieId: string;
    userId: string;
    anchorEl: HTMLElement | null;
    onClose: (operation: string) => void;
}

const GET_MOVIE_RATE = gql`
query GetMovieRate($movieId: ID!, $userId: ID!)
{
  getMovieRate(movieId: $movieId, userId: $userId) {
    rate
  }
}
`;

const SET_MOVIE_RATE = gql`
mutation RateMovie($inputRate: GiveMovieRateInputType!) {
  rateMovie(input: $inputRate) {
    id
  }
}
`;

export const MovieRate: FunctionComponent<IProps> = ({
    movieId,
    userId,
    anchorEl,
    onClose,
}: IProps) => {
    const rateOpen = Boolean(anchorEl);
    const id = rateOpen ? 'simple-popover' : undefined;
    const handleRateClose = (event: React.MouseEvent<HTMLElement>) => {
        onClose("rate");
        event.stopPropagation();
    };

    const [rate, setRate] = useState<number>(0);
    const { loading, data } = useQuery<IMovieRateResult>(
        GET_MOVIE_RATE,
        {
            initialFetchPolicy: "no-cache",
            variables: { movieId, userId }
        });

    useEffect(() =>{
        if(!loading) {
            setRate(data?.getMovieRate?.rate ?? 0);
        } else {
            setRate(0);
        }
    }, [loading]);

    const [addRate] = useMutation(SET_MOVIE_RATE);

    const handleChangeValue = (event: React.SyntheticEvent, newValue: number | null) => {
        addRate({ variables: { inputRate: {movieId, userId, rate: newValue }}});
        onClose("rate");
        event.stopPropagation();
    };

    const handleRateClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    };

    console.log({rate});
    return (<Popover
        id={id}
        open={rateOpen}
        anchorEl={anchorEl}
        onClose={handleRateClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
    >
        {loading ? (<p>Loading rate ...</p>) : (
            <Rating
                name="simple-controlled"
                value={rate}
                onClick={handleRateClick}
                onChange={handleChangeValue}
            />)}
    </Popover>);
}