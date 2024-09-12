"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@apollo/client");
const client = new client_1.ApolloClient({
    link: new client_1.HttpLink({
        uri: 'http://localhost:4000/graphql',
        fetch,
    }),
    cache: new client_1.InMemoryCache(),
});
exports.default = client;
