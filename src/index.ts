import "reflect-metadata";
import {createConnection} from "typeorm";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./registration/typeDefs";
import { resolvers } from "./registration/resolver";

const startServer = async () => {
    await createConnection();
    const server = new ApolloServer({typeDefs, resolvers});
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
}

startServer();


