import { EUserType, IAuthContext } from "../data/user";

export const contextService = {
    validateAuth: (context: IAuthContext) => {
        if(!context.isAuth) {
            throw Error("Unauthorized");
        }
    },

    checkIsAdmin: (context: IAuthContext) => {
        contextService.validateAuth(context);
        if(context.userType !== EUserType.Admin) {
            throw Error(`User '${context.login}' is not admin`);
        }
    },
};