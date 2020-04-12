import "reflect-metadata";
import {createConnection} from "typeorm";
import { ApolloServer } from "apollo-server";
import {User} from "./entity/User";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolver";

const startServer = async () => {
    await createConnection();
    const server = new ApolloServer({typeDefs, resolvers});
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
}

startServer();


