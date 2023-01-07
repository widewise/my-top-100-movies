import {
    UserType,
} from "../types/user";
import { IAuthContext, UserModel } from "../../data/user";
import { contextService } from '../../services/contextService';

export const userQueries = {
    profile: {
        type: UserType,
        resolve: (_, args, context: IAuthContext) => {
            contextService.validateAuth(context);
            return UserModel.findById(context.userId);
        }
    },
};