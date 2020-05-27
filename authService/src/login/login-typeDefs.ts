import {gql} from "apollo-server";
import 'apollo-cache-control';

export const logintypeDefs = gql`

    directive @cacheControl(
        maxAge: Int,
        scope: CacheControlScope
    ) on OBJECT | FIELD_DEFINITION

    enum CacheControlScope {
        PUBLIC
        PRIVATE
    }

    type UserInfo @cacheControl(maxAge: 240){
        firstName: String!
        lastName: String!
    }

    extend type Query {
        getUserInfo: UserInfo
    }
    
    type LoginResponse {
        user: User
        message: String!
    }

    extend type Mutation {
        login(email: String!, password: String): LoginResponse
    }
    
    
`