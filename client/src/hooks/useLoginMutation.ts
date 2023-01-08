import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useUserType } from "./useUserType";
import { useAuthToken } from "./useAuthToken";

export const LOGIN = gql`
mutation Login($loginInput: LoginInputType!) {
    login(input: $loginInput) {
        token
        userType
    }
}
`;

export const useLoginMutation = () => {
    const [, setAuthToken] = useAuthToken();
    const [, setUserType] = useUserType();

    const [mutation, mutationResults] = useMutation(LOGIN, {
        onCompleted: (data) => {
            setAuthToken(data.login.token);
            setUserType(data.login.userType);
        },
    });

    const login = (user: string, password: string) => {
        return mutation({
            variables: { loginInput: { login: user, password } }
        });
    }

    return [login, mutationResults]
};