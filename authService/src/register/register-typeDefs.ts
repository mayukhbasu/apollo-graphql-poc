import {gql} from "apollo-server";

export const registerTypeDefs = gql`

    type Query {
        hi: String!
    }
    type User @key(fields: "id"){
        id: String! 
        email: String! 
        password: String! 
        confirmPassword: String! 
        confirmed: Boolean
    }

    

    type Error {
        path: String!
        message: String!
    }

    type Mutation {
        register(email: String!, password: String!, confirmPassword: String!, firstName: String!, lastName: String!): [Error!]
    }
    
    
`