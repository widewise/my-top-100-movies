import { Schema, model, } from 'mongoose';

export interface IRate {
    id: string;
    userId: string;
    movieId: string;
    rate: number;
}

const rateSchema = new Schema<IRate>({
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    rate: { type: Number, required: true, min: 1, max: 10 },
});

export const RateModel = model<IRate>("rate", rateSchema);