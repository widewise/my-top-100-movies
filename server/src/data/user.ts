import { Schema, model, } from 'mongoose';
import bcrypt from "bcrypt";

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

export interface IAuthContext {
    isAuth: boolean;
    userId: string;
    login: string;
    userType: EUserType;
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

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

export const UserModel = model<IUser>("user", userSchema);