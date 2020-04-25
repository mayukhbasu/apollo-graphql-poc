import {gql} from "apollo-server";

export const logoutTypeDefs = gql`

    extend type Query {
        dummy: String!
    }

    extend type Mutation{
        logout: Boolean
    }

`