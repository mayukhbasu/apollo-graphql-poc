import {gql} from "apollo-server";

export const typeDefs = gql`

    type Query {
        get: String!
    }
    type User {
        id: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Mutation {
        register(email: String!, password: String!, confirmPassword: String!): User
    }
`