import { User } from "../entity/User";
import * as yup from 'yup';
import * as bcrypt from 'bcryptjs';

const schema = yup.object().shape({
    email: yup.string().min(1).max(255).email(),
    password: yup.string().min(1).max(255),
    confirmPassword: yup.string().min(1).max(255)
})

export const resolvers: any = {
    Mutation: {
        register: async (_:any, args:any) => {
            const {email, password, confirmPassword} = args;
            try {
                schema.validate(args, {abortEarly: false})
            } catch(err) {
                console.log(err);
            }
            const userAlreadyExists = await User.findOne({where: {email}});
            if(userAlreadyExists) {
                return [
                    {
                        path: "email",
                        message: "email already used"
                    }
                ]
            }
            if(password === confirmPassword) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = User.create({
                    email, 
                    password : hashedPassword
                });
                await user.save();
                return null;
            } else {
                return [
                    {
                        path: "password",
                        message: "Passwords do not match"
                    }
                ];
            }
        }
    }
}