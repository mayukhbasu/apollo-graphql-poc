import "reflect-metadata";
import {createConnection} from "typeorm";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolver";
import { buildFederatedSchema } from "@apollo/federation";

createConnection();
const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
      
    }
  ]),
  context: ({req}) => {
    console.log(req);
    return {message: "Hello Graphql"}
  }
 
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

