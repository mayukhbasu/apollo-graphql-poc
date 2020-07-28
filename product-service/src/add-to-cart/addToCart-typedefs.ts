import { gql } from "apollo-server";

export const AddToCartTypeDefs = gql`

    type Cart {
        userID: string
        products: [Products]
    }

    extend type Error {
        message: String! @external
    }

    type Query {
        viewCart(userID: String!): [Cart]
    }

    type Mutation {
        addToCart(userID: String!, products: [Products]): Error
    }

`