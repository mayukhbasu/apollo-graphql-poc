import { getUser } from "./utils";
import { ApolloServer } from "apollo-server-express";
import * as connectRedis from "connect-redis"; 
import * as session from "express-session";
import { redis } from "./redis";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
      request.http.headers.set('authorization', context.token);
    }
    async didReceiveResponse({ response, request, context }) {
      context.accessToken = response.http.headers.get('accessToken');
      context.refreshToken = response.http.headers.get('refreshToken');
      return response;
    }
  }
  
  const path = "/";
  const PORT = 4000;
  const RedisStore = connectRedis(session);
  //const RedisStore = connectRedis(session);
  const app = express();
  app.use(cookieParser());
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
const gateway = new ApolloGateway({
    serviceList: [
      { name: 'auth', url: 'http://localhost:4001' }
      
      // List other services here
    ],
    buildService({ name, url }) {
      return new AuthenticatedDataSource({url });
    },
  });

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
  context: ({ req, res}) => {
    // Get the user token from the headers
    console.log(req.cookies);
    const token = req.headers.authorization.split(" ")[1] || 'abc';
    //const token = req.cookies.authorization.split(" ")[1] || 'abc';
    // Try to retrieve a user with the token
    return {redis, token, accessToken:""}
  },
  debug: true,
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse({ context, response }) {
            response.http.headers.set('Set-Cookie', `accessToken=${context.accessToken}; expires=Tue, 03-Apr-2018 14:47:31 GMT; Max-Age=31449600; Path=/`);
            response.http.headers.set('Set-Cookie', `refreshToken=${context.refreshToken}; expires=Tue, 03-Apr-2018 14:47:31 GMT; Max-Age=31449600; Path=/`);
            //console.log(response.http.headers);
            
          }
        };
      }
    }
  ]
});
server.applyMiddleware({app, path});
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
