import { Schema, model, } from 'mongoose';

export enum EUserType {
    User = 'user',
    Admin = 'admin',
}

export enum EUserStatus {
    Active = 'active',
    Removed = 'removed',
}

export interface IUser {
    id: string;
    login: string;
    type: EUserType,
    password: string;
    status: EUserStatus;
    email?: string;
    description?: string;
}

const userSchema = new Schema<IUser>({
    login: { type: String, required: true },
    type: {
        type: String,
        default: EUserType.User,
        enum: Object.values(EUserType),
        required: true
    },
    password: { type: String, required: false },
    status: {
        type: String,
        default: EUserStatus.Active,
        enum: Object.values(EUserStatus),
        required: true
    },
    email: { type: String, required: false },
    description: { type: String, required: false },
});

export const UserModel = model<IUser>("user", userSchema);