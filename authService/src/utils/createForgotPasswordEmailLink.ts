import { Redis } from "ioredis";
import {v4} from "uuid";
import { forgotPasswordPrefix } from "../constants";

export const createForgotPasswordLink = async(url:string, userId: string, redis: Redis) => {
    const token = v4();
    await redis.set(`${forgotPasswordPrefix}${token}`, userId, "ex", 60*60*5);
    return `${url}/change-password/${token}`
}