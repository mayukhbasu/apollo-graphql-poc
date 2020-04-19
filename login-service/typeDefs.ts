import {gql} from "apollo-server";


export const typeDefs = gql`

    type Query {
        get: String!
    }
    extend type User @key(fields: "id") {
        id: String! @external
    }

    type LoginResponse {
        token: String!
        user: User!
    }

    type Mutation {
        login(email: String!, password: String!): LoginResponse!
    }
    
    
`