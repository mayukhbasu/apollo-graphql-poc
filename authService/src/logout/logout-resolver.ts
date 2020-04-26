import { userSessionIdPrefix, redisSessionPrefix } from "../constants";
import { removeAllUserSession } from "../utils/removeAllUsersSession";


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
                removeAllUserSession(userId, redis);
                return true;
            }

            return false;
        }
    }
}