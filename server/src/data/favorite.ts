import { Schema, model, } from 'mongoose';

export interface IFavorite {
    id: string;
    userId: string;
    movieId: string;
}

const favoriteSchema = new Schema<IFavorite>({
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
});

export const FavoriteModel = model<IFavorite>("favorite", favoriteSchema);