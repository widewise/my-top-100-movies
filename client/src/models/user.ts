export interface IUserResult {
    profile: IProfile
}

export interface IProfile {
    type: string,
    login: string;
    email: string;
    description: string;
}