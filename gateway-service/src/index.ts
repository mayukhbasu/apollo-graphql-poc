import { getUser } from "./utils";
import { ApolloServer } from "apollo-server";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
      // Pass the user's id from the context to underlying services
      // as a header called `user-id`
      request.http.headers.set('user-id', context.userId);
    }
  }

const gateway = new ApolloGateway({
    serviceList: [
      { name: 'register', url: 'http://localhost:4001' },
      { name: 'login', url: 'http://localhost:4002' },
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
    const token = req.headers.authorization.split(" ")[1] || '';
    // Try to retrieve a user with the token
    const username:any = getUser(token);
    // Add the user ID to the context
    console.log(username.username);
    return { username };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
