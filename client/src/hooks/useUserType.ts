import { useCookies } from "react-cookie";

const USER_TYPE_NAME = "userType";

export const useUserType = () => {
    const [cookies, setCookie, removeCookie] = useCookies([USER_TYPE_NAME]);

    const setUserType = (userType: string) => setCookie(USER_TYPE_NAME, userType,{ path: "/" });

    const removeUserType = () => removeCookie(USER_TYPE_NAME,{ path: "/" });

    return [cookies[USER_TYPE_NAME], setUserType, removeUserType];
};