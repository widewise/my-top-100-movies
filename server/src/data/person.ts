import { Schema, model, } from 'mongoose';

export enum EGender {
    Female = 'female',
    Male = 'male',
}

export interface IPerson {
    id: string;
    name: string;
    gender: EGender;
    biography?: string,
    birthdate?: Date;
    birthplace?: string;
    photoUrl?: string;
}

const personSchema = new Schema<IPerson>({
    name: { type: String, required: true },
    gender: {
        type: String,
        default: EGender.Male,
        enum: Object.values(EGender),
        required: true
    },
    biography: { type: String, required: false },
    birthdate: { type: Date, required: false },
    birthplace: { type: String, required: false },
    photoUrl: { type: String, required: false },
});

export const PersonModel = model<IPerson>("person", personSchema);