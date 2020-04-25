import "reflect-metadata";
import {createConnection} from "typeorm";
import * as session from "express-session";
import * as connectRedis from "connect-redis"; 
import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";
import { logintypeDefs } from "./login/login-typeDefs";
import { loginResolver  } from "./login/login-resolver";
import { registerTypeDefs } from "./register/register-typeDefs";
import {registerResolver} from "./register/register-resolver";
import { buildFederatedSchema } from "@apollo/federation";
import * as express from 'express';
import { redis } from "./redis";
import { confirmEmail } from "./routes/sendEmailRoute";
import { logoutTypeDefs } from "./logout/logout-typeDefs";
import { logoutResolver } from "./logout/logout-resolver";

createConnection();
const path = "/";
const PORT = 4001;
const RedisStore = connectRedis(session);
const app = express();
app.use(
  session({
    store: new RedisStore({ host: 'localhost', port: 6379, client: redis,ttl :  260}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      path: "/",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
)
const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs: logintypeDefs,
      resolvers: loginResolver
    },
    {
      typeDefs: registerTypeDefs,
      resolvers: registerResolver
    },
    {
      typeDefs: logoutTypeDefs,
      resolvers: logoutResolver
    }
  ]),
  context: ({req}) => {
      return {
          redis,
          url: req.protocol + "://" + req.get("host"),
          session: req.session,
          req
      }
  }
});

app.get("/confirm/:id", confirmEmail);
server.applyMiddleware({app, path});
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
)

