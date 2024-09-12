"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// apolloClient.ts
const client_1 = require("@apollo/client");
// Set up the HTTP link with the correct GraphQL server URI
const httpLink = new client_1.HttpLink({
    uri: 'http://localhost:4000/graphql', // Ensure this matches the endpoint you're using in the sandbox
});
// Create Apollo Client
const client = new client_1.ApolloClient({
    link: httpLink,
    cache: new client_1.InMemoryCache(),
});
exports.default = client;
