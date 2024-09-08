import 'reflect-metadata'; // Import reflect-metadata at the top
import express, { Application } from 'express'; // Import Application from express
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';

async function startServer() {
  const app: Application = express(); // Define app as an Application type

  // Build TypeGraphQL schema
  const schema = await buildSchema({
    resolvers: [UserResolver], // Register the UserResolver
  });

  // Create Apollo Server instance
  const server = new ApolloServer({
    schema,
  });

  // Start the Apollo server
  await server.start();

  // Apply Apollo GraphQL middleware to Express server
  server.applyMiddleware({ 
    app, 
    path: '/api/graphql' // New entry point path
  });


  // Start the Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/api/graphql`);
  });
}

// Call the function to start the server
startServer();
