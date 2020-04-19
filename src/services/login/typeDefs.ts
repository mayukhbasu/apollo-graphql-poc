import {gql} from "apollo-server";


export const typeDefs = gql`

    type Query {
        get: String!
    }
    type User @key(fields: "id") {
        id: String!
        email: String!
        password: String!
    }

    type LoginResponse {
        token: String
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): LoginResponse!
    }
    
    
`