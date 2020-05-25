import { createConnection } from "typeorm";
import { ApolloServer} from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { addProductTypeDefs } from "./add-product/add-product-typeDefs";
import { addProductResolver } from "./add-product/add-product-resolver";
import * as express from 'express';

createConnection();
const path = "/";
const PORT = 4002;
const app = express();
const server = new ApolloServer({
    schema: buildFederatedSchema([
        {
            typeDefs: addProductTypeDefs,
            resolvers: addProductResolver
        }
    ])
});

server.applyMiddleware({app, path});
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4002${server.graphqlPath}`)
)