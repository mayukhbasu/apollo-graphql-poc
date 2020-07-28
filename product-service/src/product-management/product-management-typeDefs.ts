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
        user: User
    }

    extend type User @key(fields: "id") {
        id: String! @external
    }

    type Mutation {
        addProduct(title: String!, price: Int!, category: String!, url: String!): Error
    }
    
`