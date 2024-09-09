import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import express from 'express';
import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import * as typeDefs from './schema.graphql';

// Initialize PubSub for managing subscriptions
const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

// Define TypeScript types for the objects
type Message = { id: number; content: string; author: string };
type User = { id: number; name: string; email: string };

// In-memory storage with explicit typing
let messages: Message[] = [];
let users: User[] = [];
let messageId = 0;
let userId = 0;

// Define resolvers with explicit types
const resolvers = {
  Query: {
    messages: (): Message[] => messages,
    user: (_: any, { id }: { id: number }): User | undefined =>
      users.find(user => user.id === id),
  },
  Mutation: {
    addMessage: (
      _: any,
      { content, author }: { content: string; author: string }
    ): Message => {
      const newMessage: Message = { id: ++messageId, content, author };
      messages.push(newMessage);
      pubsub.publish(MESSAGE_ADDED, { messageAdded: newMessage });
      return newMessage;
    },
    createUser: (
      _: any,
      { name, email }: { name: string; email: string }
    ): User => {
      const newUser: User = { id: ++userId, name, email };
      users.push(newUser);
      return newUser;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
    },
  },
};

// Define typeDefs as a plain string


// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create an Express application
const app = express();

// Create an instance of ApolloServer
const server = new ApolloServer({ schema });

// Start the Apollo Server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Create an HTTP server
  const httpServer = createServer(app);

  // Create a WebSocket server for handling GraphQL subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: server.graphqlPath,
  });

  // Use the GraphQL WebSocket server
  useServer({ schema }, wsServer);

  // Start listening on a specific port
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Initialize the server
startServer();
