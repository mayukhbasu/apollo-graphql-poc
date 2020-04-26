import { gql } from "apollo-server-express";

export const forgotPasswordTypeDefs = gql `
    extend type Query {
        dummy1: String!
    }
    
    extend type Mutation{
        sendForgotPasswordEmail(email:String!): Boolean
        forgotPasswordChange(newPassword: String!, token: String!): User
    }
`