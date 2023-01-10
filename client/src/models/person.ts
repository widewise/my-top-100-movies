export enum EGender {
    Female = 'Female',
    Male = 'Male',
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

export interface IPersonLite {
    id: string;
    name: string;
}

export interface IPersonDictionaryResult {
    personsToAddToMovie: Array<IPersonLite>;
}