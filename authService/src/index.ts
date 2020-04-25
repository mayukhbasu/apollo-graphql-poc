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

createConnection();
const path = "/";
const PORT = 4001;
const RedisStore = connectRedis(session);
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
          url: req.protocol + "://" + req.get("host"),
          session: req.session
      }
  }
});

const app = express();
app.use(
  session({
    store: new RedisStore({ client: redis as any }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
)
app.get("/confirm/:id", confirmEmail);
server.applyMiddleware({app, path});
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
)

