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
                const sessionIds = await redis.lrange(
                    `${userSessionIdPrefix}${userId}`,
                    0,
                    -1
                  );
    
                  const promises = [];
                  for(let i = 0; i < sessionIds.length; i++) {
                    promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`))
                }
                promises.push(redis.del(`${userSessionIdPrefix}${userId}`))
                await Promise.all(promises);
                return true;
            }

            return false;
        }
    }
}