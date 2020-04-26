import { User } from "../entities/User";
import { createForgotPasswordLink } from "../utils/createForgotPasswordEmailLink";
import { sendPasswordConfirmationEmail } from "../utils/sendEmail";
import { forgotPasswordPrefix } from "../constants";
import * as bcrypt from 'bcryptjs';

export const forgotPasswordResolver = {
    Query: {
        dummy1: () => "hello Mayukh"
    },
    Mutation: {
        sendForgotPasswordEmail: async (parent:any, {email}, {redis, url}, info ) => {
            const user = await User.findOne({where: {email}});
            if(!user) {
                return false;
            }
            const link = await createForgotPasswordLink(url, user.id, redis);
            await sendPasswordConfirmationEmail(email, link);
            return true;
        },
        forgotPasswordChange: async(parent:any, {newPassword, token}, {redis}, info) => {
            console.log("Method forgot password started")
            const key = `${forgotPasswordPrefix}${token}`;
            const userId = await redis.get(key);
            console.log(userId);
            const user = await User.findOne(userId);
            console.log(user);
            if(!userId){
                return null;
            }
            await redis.del(key);
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();
            return user;
        }
    },
    
}