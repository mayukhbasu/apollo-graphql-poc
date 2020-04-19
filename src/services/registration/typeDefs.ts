import {gql} from "apollo-server";

export const typeDefs = gql`

    type Query {
        get: String!
    }
    type User @key(fields: "id") {
        id: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    

    type Error {
        path: String!
        message: String!
    }

    type Mutation {
        register(email: String!, password: String!, confirmPassword: String!): [Error!]
    }
    
    
`