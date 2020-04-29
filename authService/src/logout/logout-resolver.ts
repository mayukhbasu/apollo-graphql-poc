import { removeAllUserSession } from "../utils/removeAllUsersSession";



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
            console.log(req.sessionID)
            const isBlacklisted = await redis.get(authorization);
            console.log(isBlacklisted);
            if(isBlacklisted){
                return false;
            }
            if(userId) {
                await removeAllUserSession(userId, redis);
                await redis.set(authorization, "blacklisted")
                return true;
            }

            return false;
        }
    }
}