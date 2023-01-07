import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken } from "./useAuthToken";

export const loginGQL = gql`
mutation Login($loginInput: LoginInputType!) {
    login(input: $loginInput) {
        token
    }
}
`;

export const useLoginMutation = () => {
    const [_, setAuthToken] = useAuthToken();

    const [mutation, mutationResults] = useMutation(loginGQL, {
        onCompleted: (data) => {
            setAuthToken(data.login.token);
        },
    });

    const login = (user: string, password: string) => {
        return mutation({
            variables: { loginInput: { login: user, password } }
        });
    }

    return [login, mutationResults]
};