import { userSessionIdPrefix, redisSessionPrefix } from "../constants";
import { removeAllUserSession } from "../utils/removeAllUsersSession";
import { getUser } from "../utils/getUser";


export const logoutResolver:any = {
    Query: {
        dummy: () => {
            return "Hello Logout Resolver"
        }
    },
    Mutation: {
        logout: async(parent:any, args:any, {req, redis}, info) => {
            
            console.log(req.headers);
            const userId = req.headers.userid;
            const {authorization} = req.headers;
            const sessionID = req.sessionID;
            console.log(req.sessionID)
            const isBlacklisted = await redis.mget(authorization);
            console.log(isBlacklisted);
            if(userId) {
                await removeAllUserSession(userId, redis);
                await redis.set(authorization, "blacklisted")
                const isBlacklisted = await redis.mget(authorization);
                console.log(isBlacklisted);
                return true;
            }

            return false;
        }
    }
}