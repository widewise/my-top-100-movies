import { Schema, model, } from 'mongoose';

export interface IActor {
    id: string;
    movieId: string;
    personId: string;
    role: string;
}

const actorSchema = new Schema<IActor>({
    movieId: { type: String, required: true },
    personId: { type: String, required: true },
    role: { type: String, required: true },
});

export const ActorModel = model<IActor>("actor", actorSchema);