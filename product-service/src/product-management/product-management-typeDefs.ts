import {gql} from "apollo-server";

export const productManegementTypeDefs = gql`
    type Query {
        dummy3: String!
        viewAllProducts: [Product!]
    }
    extend type Error {
        message: String! @external
    }
    
    type Product {
        title: String!
        price: Int!
        category: String!
        url: String!
        id: ID!
    }
    type Mutation {
        addProduct(title: String!, price: Int!, category: String!, url: String!): Error
    }
    
`