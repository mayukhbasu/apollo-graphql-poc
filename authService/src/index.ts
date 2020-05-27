import "reflect-metadata";
import {createConnection} from "typeorm";
import * as session from "express-session";
import * as connectRedis from "connect-redis"; 
import { ApolloServer} from "apollo-server-express";
import { logintypeDefs } from "./login/login-typeDefs";
import { loginResolver  } from "./login/login-resolver";
import { registerTypeDefs } from "./register/register-typeDefs";
import {registerResolver} from "./register/register-resolver";
import { buildFederatedSchema } from "@apollo/federation";
import * as passport from 'passport';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { redis } from "./redis";
import './utils/passport';
import { confirmEmail } from "./routes/sendEmailRoute";
import { logoutTypeDefs } from "./logout/logout-typeDefs";
import { logoutResolver } from "./logout/logout-resolver";
import { forgotPasswordTypeDefs } from "./forgot-password/forgot-password-typeDefs";
import { forgotPasswordResolver } from "./forgot-password/forgot-password-resolver";


createConnection();
const path = "/";
const PORT = 4001;
const RedisStore = connectRedis(session);
const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(
  session({
    store: new RedisStore({ host: 'localhost', port: 6379, client: redis,ttl :  260}),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
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
    },
    {
      typeDefs: forgotPasswordTypeDefs,
      resolvers: forgotPasswordResolver
    }
  ]),
  context: ({req, res}) => {
      return {
          redis,
          url: req.protocol + "://" + req.get("host"),
          session: req.session,
          req, res
      }
  }
});

app.get("/confirm/:id", confirmEmail);
app.get("/auth/google", passport.authenticate('google', { scope: [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'] }));

  app.get('/auth/google/callback', 
  passport.authenticate('google') , (req:any, res:any) => {
    console.log(res.user)
    res.redirect('http://localhost:3000/');
  });
  


server.applyMiddleware({app, path});
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
)

