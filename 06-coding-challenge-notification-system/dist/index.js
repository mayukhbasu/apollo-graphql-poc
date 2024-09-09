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
const TaskResolver_1 = require("./TaskResolver");
const http_1 = require("http");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // Build the TypeGraphQL schema
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [TaskResolver_1.TaskManagementResolver],
        });
        // Create the Apollo Server
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            formatError: (err) => {
                if (err.originalError instanceof Error && err.originalError.name === 'ValidationErrorWithMessage') {
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
        yield server.start();
        server.applyMiddleware({ app, path: '/graphql' });
        const httpServer = (0, http_1.createServer)(app);
        const wsServer = new ws_1.WebSocketServer({
            server: httpServer,
            path: '/graphql',
        });
        (0, ws_2.useServer)({
            schema: schema
        }, wsServer);
        const PORT = process.env.PORT || 4000;
        httpServer.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
            console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
        });
    });
}
startServer();
