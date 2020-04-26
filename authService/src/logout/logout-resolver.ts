import { userSessionIdPrefix, redisSessionPrefix } from "../constants";


export const logoutResolver:any = {
    Query: {
        dummy: () => {
            return "Hello Logout Resolver"
        }
    },
    Mutation: {
        logout: async(parent:any, args:any, {redis,session}, info) => {
            const {userId} = session;
            if(userId) {
                
                return true;
            }

            return false;
        }
    }
}