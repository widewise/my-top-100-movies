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

export interface IPersonResult {
    personById: IPerson;
}