import {gql} from "apollo-server";

export const productManegementTypeDefs = gql`
    type Query {
        dummy3: String!
        viewAllProducts: [Product!]
    }
    type Product {
        title: String!
        price: Int!
        category: String!
        url: String!
    }
    type Mutation {
        addProduct(title: String!, price: Int!, category: String!, url: String!): Product
    }
    
`