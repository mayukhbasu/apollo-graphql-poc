// apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Set up the HTTP link with the correct GraphQL server URI
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Ensure this matches the endpoint you're using in the sandbox
});

// Create Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
