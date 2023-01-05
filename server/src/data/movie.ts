import { Schema, model, } from 'mongoose';

export enum EMovieType {
    Film = 'film',
    TvShow = 'tvshow',
}

export enum EMovieGenre {
    Action = 'action',
    Adventure = 'adventure',
    Animation = 'animation',
    Comedy = 'comedy',
    Crime = 'crime',
    Drama = 'comedy',
    History = 'history',
    Horror = 'horror',
    Family = 'family',
    Fantasy = 'fantasy',
    Music = 'music',
    Mystery = 'mystery',
    Romance = 'romance',
    ScienceFiction = 'science-fiction',
    Thriller = 'thriller',
}

export interface IMovie {
    id: string;
    name: string;
    type: EMovieType;
    genres: Array<EMovieGenre>;
    year: number;
    totalScore?: number;
    duration?: number;
    description?: string;
    posterUrl?: string;
    directorId?: string;
    producerId?: string;
}

const movieSchema = new Schema<IMovie>({
    name: { type: String, required: true },
    type: {
        type: String,
        default: EMovieType.Film,
        enum: Object.values(EMovieType),
        required: true
    },
    genres: {
        type: [String],
        default: [],
        enum: Object.values(EMovieGenre),
        required: true
    },
    year: { type: Number, required: true },
    totalScore: { type: Number, required: false },
    duration: { type: Number, required: false },
    description: { type: String, required: false },
    posterUrl: { type: String, required: false },
    directorId: { type: String, required: false },
    producerId: { type: String, required: false },
});

export const MovieModel = model<IMovie>("movie", movieSchema);