import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getTokenFromCookie  } from "./components/js/cookie_util";

const httpLink = createHttpLink({
  uri: "http://localhost:7000",
});

const authLink = setContext((_, { headers }) => {
  const token = getTokenFromCookie();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
