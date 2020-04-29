import { getUser } from "./utils";
import { ApolloServer } from "apollo-server-express";
import * as connectRedis from "connect-redis"; 
import * as session from "express-session";
import { redis } from "./redis";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import * as express from 'express';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
      // Pass the user's id from the context to underlying services
      // as a header called `user-id`
      console.log("Hello Mayukh");
      
      const user = getUser(context.token);
      console.log(user);
      request.http.headers.set('Authorization', context.token);
    }
  }
  
  const path = "/";
  const PORT = 4000;
  const RedisStore = connectRedis(session);
  const app = express();

const gateway = new ApolloGateway({
    serviceList: [
      { name: 'auth', url: 'http://localhost:4001' }
      
      // List other services here
    ]
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
    const user = getUser(token);
    return {user, req}
  },
});
server.applyMiddleware({app, path});
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
