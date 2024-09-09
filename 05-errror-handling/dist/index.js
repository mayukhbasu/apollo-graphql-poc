"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./UserResolver"); // Replace with your actual resolvers
const http_1 = require("http");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws"); // Ensure the correct import
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // Build the TypeGraphQL schema
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [UserResolver_1.UserResolver],
        });
        // Create the Apollo Server
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            formatError: (err) => {
                // Customize the error format to provide better error messages
                if (err.originalError instanceof Error && err.originalError.name === 'ValidationErrorWithMessage') {
                    return {
                        message: err.message,
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            details: err.originalError.message,
                        },
                    };
                }
                // Default error format
                return err;
            },
        });
        // Start the Apollo Server
        yield server.start();
        // Apply Apollo middleware to Express app
        server.applyMiddleware({ app, path: '/graphql' });
        // Create HTTP and WebSocket servers
        const httpServer = (0, http_1.createServer)(app);
        const wsServer = new ws_1.WebSocketServer({
            server: httpServer,
            path: '/graphql',
        });
        // Set up WebSocket server with GraphQL subscriptions
        (0, ws_2.useServer)({ schema }, wsServer);
        // Start the HTTP server
        const PORT = process.env.PORT || 4000;
        httpServer.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
            console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
        });
    });
}
startServer();
