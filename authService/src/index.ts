import "reflect-metadata";
import {createConnection} from "typeorm";
import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";
import { logintypeDefs } from "./login/login-typeDefs";
import { loginResolver  } from "./login/login-resolver";
import { registerTypeDefs } from "./register/register-typeDefs";
import {registerResolver} from "./register/register-resolver";
import { buildFederatedSchema } from "@apollo/federation";
import * as express from 'express';
import { redis } from "./redis";
import { confirmEmail } from "./routes/sendEmailRoute";

createConnection();
const path = "/";
const PORT = 4001;
const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs: logintypeDefs,
      resolvers: loginResolver
    },
    {
      typeDefs: registerTypeDefs,
      resolvers: registerResolver
    }
  ]),
  context: ({req}) => {
      return {
          redis,
          url: req.protocol + "://" + req.get("host")
      }
  }
});

const app = express();
app.get("/confirm/:id", confirmEmail);
server.applyMiddleware({app, path});
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
)

