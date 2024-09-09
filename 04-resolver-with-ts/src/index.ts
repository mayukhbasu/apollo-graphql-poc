import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

async function startServer() {
  const app = express(); // Initialize Express app

  // Build TypeGraphQL schema
  const schema = (await buildSchema({
    resolvers: [UserResolver], // Register the UserResolver
  })) 

  // Create Apollo Server instance
  const server = new ApolloServer({
    schema,
  });

  // Start the Apollo server
  await server.start();

  // Apply Apollo GraphQL middleware to Express server
  server.applyMiddleware({ app, path: '/graphql' });

  // Create an HTTP server and WebSocket server for subscriptions
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Use the GraphQL WebSocket server with the correct schema type
  useServer(
    {
      schema: schema as any, // Pass the schema with explicit type assertion
    },
    wsServer
  );

  // Start the HTTP server
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

// Start the server
startServer();
