export enum EMovieType {
    Film = 'Film',
    TvShow = 'TvShow',
}

export enum EMovieGenre {
    Action = 'Action',
    Adventure = 'Adventure',
    Animation = 'Animation',
    Comedy = 'Comedy',
    Crime = 'Crime',
    Drama = 'Drama',
    History = 'History',
    Horror = 'Horror',
    Family = 'Family',
    Fantasy = 'Fantasy',
    Music = 'Music',
    Mystery = 'Mystery',
    Romance = 'Romance',
    ScienceFiction = 'ScienceFiction',
    Thriller = 'Thriller',
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
    genres: Array<EMovieGenre>;
    year: number;
    totalScore?: number;
    duration?: number;
    description?: string;
    posterUrl?: string;
}
