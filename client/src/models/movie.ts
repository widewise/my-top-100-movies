export enum EMovieType {
    Film = 'film',
    TvShow = 'tvshow',
}

export interface IMoviesResult {
    top100Movies: Array<IMovieListItem>;
}

export interface IMovieListItem {
    id: string;
    name: string;
    year: number;
    totalScore?: number;
    posterUrl: string;
}

export interface IMovieResult {
    movieById: IMovieInfo;
}

export interface IMovieInfo {
    id: string;
    name: string;
    type: EMovieType;
    genres: Array<string>;
    year: number;
    totalScore?: number;
    duration?: number;
    description?: string;
    posterUrl?: string;
}
