import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { QueryResolver } from './resolvers/QueryResolver';
import { MutationResolver } from './resolvers/MutationResolver';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

async function startServer() {
  const app = express();

  // Build the TypeGraphQL schema
  const schema = await buildSchema({
    resolvers: [QueryResolver, MutationResolver],
  });

  // Create the Apollo Server
  const server = new ApolloServer({
    schema,
    formatError: (err) => {
      if (err.originalError instanceof Error && err.originalError.name === 'ValidationErrorWithMessage') {
        return {
          message: err.message,
          extensions: {
            code: 'BAD_USER_INPUT',
            details: err.originalError.message,
          },
        };
      }
      return err;
    },
  });

  // Start the Apollo Server
  await server.start();
  server.applyMiddleware({ app: app as any, path: '/graphql' });

  // Create HTTP and WebSocket servers
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });

  // Set up WebSocket server with GraphQL subscriptions
  useServer({ schema }, wsServer);

  // Start the HTTP server
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer();
