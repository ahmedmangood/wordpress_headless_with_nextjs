import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const url = process.env.WORDPRESS_URL;
let client: any;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${url}/graphql`,
    }),
    cache: new InMemoryCache(),
  });
}

const cache = new InMemoryCache({
  typePolicies: {
    Language: {
      keyFields: ["ar", "en"],
    },
  },
});
