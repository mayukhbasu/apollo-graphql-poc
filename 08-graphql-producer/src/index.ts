import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws'; // Correct path to useServer
import { UserResolver } from './resolvers/UserResolver';

async function startServer() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
    formatError: (err) => {
      if (err.originalError instanceof Error && err.originalError.name === 'ValidationError') {
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

  await server.start();
  server.applyMiddleware({ app: app as any, path: '/graphql' });

  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema: schema as any }, wsServer);

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer();
