import { createConnection } from "typeorm";
import { ApolloServer} from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { productManegementTypeDefs } from "./product-management/product-management-typeDefs";
import { productManegementResolvers } from "./product-management/product-management-resolver";
import * as express from 'express';
import { validateToken } from "./utils/validate-token";

createConnection();
const path = "/";
const PORT = 4002;
const app = express();
app.use(validateToken);
const server = new ApolloServer({
    schema: buildFederatedSchema([
        {
            typeDefs: productManegementTypeDefs,
            resolvers: productManegementResolvers
        }
    ]),
    context: ({req, res}) => {
        return {
            
            req, res
        }
    }
});

server.applyMiddleware({app, path});
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4002${server.graphqlPath}`)
)