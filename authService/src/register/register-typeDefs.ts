import {gql} from "apollo-server";

export const registerTypeDefs = gql`

    type Query {
        hi: String!
    }
    type User @key(fields: "id"){
        firstName: String!
        lastName: String!
        id: String! 
        email: String! 
        password: String
        confirmPassword: String! 
        confirmed: Boolean

    }

    

    type Error @key(fields: "message") {
        path: String!
        message: String!
    }

    type Mutation {
        register(email: String!, password: String, confirmPassword: String!, firstName: String!, lastName: String!): [Error!]
    }
    
    
`