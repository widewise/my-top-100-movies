export interface IPersonCard {
    id: string;
    name: string;
    photoUrl?: string;
}

export interface IActor {
    id: string;
    person: IPersonCard;
    role: string;
}

export interface IActorsResult {
    actorsByMovieId: Array<IActor>;
}

export interface IMovieCard {
    id: string;
    name: string;
    posterUrl?: string;
}

export interface IPersonMovie {
    id: string;
    movie: IMovieCard;
    role: string;
}

export interface IMoviesListResult {
    moviesByPersonId: Array<IPersonMovie>;
}