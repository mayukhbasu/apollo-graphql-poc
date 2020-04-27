import { getUser } from "./utils";
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import * as express from 'express';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
      // Pass the user's id from the context to underlying services
      // as a header called `user-id`
      request.http.headers.set('Authorization', context.token);

    }
  }

const path = "/";
const PORT = 4000;
const gateway = new ApolloGateway({
    serviceList: [
      { name: 'auth', url: 'http://localhost:4001' }
      
      // List other services here
    ],
    buildService({ name, url }) {
      return new AuthenticatedDataSource({ url });
    },
  });

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
  context: ({ req }) => {
    // Get the user token from the headers
    const token = req.headers.authorization.split(" ")[1] || 'abc';
    // Try to retrieve a user with the token
    return {token}
  },
});
const app = express();
server.applyMiddleware({app, path});

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
