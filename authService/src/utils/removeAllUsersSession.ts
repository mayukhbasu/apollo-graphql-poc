import { Redis } from "ioredis";
import { userSessionIdPrefix, redisSessionPrefix } from "../constants";

export const removeAllUserSession = async (userId: string, redis: Redis) => {
    console.log("Inside remove all sessions");
    const sessionIds = await redis.lrange(
        `${userSessionIdPrefix}${userId}`,
        0,
        -1
      );
      console.log(sessionIds);
      const promises = [];
      for(let i = 0; i < sessionIds.length; i++) {
        promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`))
    }
    promises.push(redis.del(`${userSessionIdPrefix}${userId}`))
    await Promise.all(promises);
}

