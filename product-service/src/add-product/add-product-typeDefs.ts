import {gql} from "apollo-server";

export const addProductTypeDefs = gql`
    type Query {
        dummy3: String!
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