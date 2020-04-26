import { User } from "../entities/User";
import { createForgotPasswordLink } from "../utils/createForgotPasswordEmailLink";


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
            await createForgotPasswordLink(url, user.id, redis);
            return true;
        }
    }
}