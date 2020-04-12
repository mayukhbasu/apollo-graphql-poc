import { User } from "./entity/User";

export const resolvers: any = {
    Mutation: {
        register: async (_:any, args:any) => {
            const {email, password, confirmPassword} = args;
            if(password === confirmPassword) {
                const user = User.create({
                    email, password
                });
                await user.save();
                return user;
            } else {
                return null;
            }
        }
    }
}