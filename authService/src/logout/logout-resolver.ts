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
            const userId = getUser(req.headers.authorization).id;
            const {authorization} = req.headers;
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