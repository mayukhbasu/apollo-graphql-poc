import { gql } from "apollo-server";

export const AddToCartTypeDefs = gql`

    type Cart {
        title: String!
        itemNumbers: Number!
        price: Number!
    }

    extend type Error {
        message: String! @external
    }

    type Query {
        viewCart(userID: String!): [Cart]
    }

    type Mutation {
        addToCart(userID: String!, productID: String!, itemNumbers: Number!, price: Number!): Error
    }

`