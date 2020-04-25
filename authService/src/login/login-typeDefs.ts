import {gql} from "apollo-server";


export const logintypeDefs = gql`

    extend type Query {
        get: String!
    }
    
    type LoginResponse {
        token: String
        user: User
        message: String!
    }

    extend type Mutation {
        login(email: String!, password: String!): LoginResponse
    }
    
    
`