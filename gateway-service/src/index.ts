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
      context.accessToken = response.http.headers.get('accesstoken');
      context.refreshToken = response.http.headers.get('refreshtoken');
      console.log()
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
      { name: 'auth', url: 'http://localhost:4001' },
      { name: 'product', url: 'http://localhost:4002' }
      
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
    let token;
    if(req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      token = "";
    }
    //console.log(token);
    //const token = req.cookies.authorization.split(" ")[1] || 'abc';
    // Try to retrieve a user with the token
    return {redis, token}
  },
  debug: true,
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse({ context, response }) {
            console.log("The access token is")
            console.log(context.accessToken)
            if(context.accessToken) {
              response.http.headers.set('Access-Control-Expose-Headers', '*');
              response.http.headers.set('accesstoken', `${context.accessToken}`);
            }
            
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
