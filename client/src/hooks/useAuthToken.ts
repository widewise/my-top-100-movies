import { useCookies } from "react-cookie";

const TOKEN_NAME = "authToken";

export const useAuthToken = () => {
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

    const setAuthToken = (authToken: string) => setCookie(TOKEN_NAME, authToken,{ path: "/" });

    const removeAuthToken = () => removeCookie(TOKEN_NAME,{ path: "/" });

    return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};