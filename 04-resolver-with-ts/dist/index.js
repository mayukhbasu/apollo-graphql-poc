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
const UserResolver_1 = require("./UserResolver");
const http_1 = require("http");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)(); // Initialize Express app
        // Build TypeGraphQL schema
        const schema = (yield (0, type_graphql_1.buildSchema)({
            resolvers: [UserResolver_1.UserResolver], // Register the UserResolver
        }));
        // Create Apollo Server instance
        const server = new apollo_server_express_1.ApolloServer({
            schema,
        });
        // Start the Apollo server
        yield server.start();
        // Apply Apollo GraphQL middleware to Express server
        server.applyMiddleware({ app, path: '/graphql' });
        // Create an HTTP server and WebSocket server for subscriptions
        const httpServer = (0, http_1.createServer)(app);
        const wsServer = new ws_1.WebSocketServer({
            server: httpServer,
            path: '/graphql',
        });
        // Use the GraphQL WebSocket server with the correct schema type
        (0, ws_2.useServer)({
            schema: schema, // Pass the schema with explicit type assertion
        }, wsServer);
        // Start the HTTP server
        const PORT = process.env.PORT || 4000;
        httpServer.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
            console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
        });
    });
}
// Start the server
startServer();
