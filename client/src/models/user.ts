export interface IUserResult {
    profile: IProfile
}

export interface IProfile {
    id: string;
    login: string;
    email: string;
}