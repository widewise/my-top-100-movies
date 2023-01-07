import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
} from '@apollo/client';
import { useAuthToken } from "./useAuthToken";

const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });

const authMiddleware = (authToken: string | undefined) =>
    new ApolloLink((operation, forward) => {
        if (authToken) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            });
        }

        return forward(operation);
    });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
    const [authToken] = useAuthToken();
    return new ApolloClient({
        link: authMiddleware(authToken).concat(httpLink),
        cache,
    });
};