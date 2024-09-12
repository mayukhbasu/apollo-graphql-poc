"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const http_1 = require("http");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws"); // Correct path to useServer
const UserResolver_1 = require("./resolvers/UserResolver");
async function startServer() {
    const app = (0, express_1.default)();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolver_1.UserResolver],
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        formatError: (err) => {
            if (err.originalError instanceof Error && err.originalError.name === 'ValidationError') {
                return {
                    message: err.message,
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        details: err.originalError.message,
                    },
                };
            }
            return err;
        },
    });
    await server.start();
    server.applyMiddleware({ app: app, path: '/graphql' });
    const httpServer = (0, http_1.createServer)(app);
    const wsServer = new ws_1.WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });
    (0, ws_2.useServer)({ schema: schema }, wsServer);
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
        console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
    });
}
startServer();
