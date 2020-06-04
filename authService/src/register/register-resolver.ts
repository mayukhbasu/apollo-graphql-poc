
import * as yup from 'yup';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/User';
import { createConfirmEmailLink } from '../utils/createConfirmEmailLink';
import { sendEmail } from '../utils/sendEmail';

const schema = yup.object().shape({
    email: yup.string().min(1).max(255).email(),
    firstName: yup.string().min(1).max(255),
    lastName: yup.string().min(1).max(255),
    password: yup.string().min(1).max(255),
    confirmPassword: yup.string().min(1).max(255)
})
// const fetchUserById = async (id) => {
//     let user = await User.findOne({where: {id}});
//     return user;
// }
export const registerResolver: any = {
    Query: {
        me() {
          return { id: "1", username: "@ava" }
        }
      },
    //   User: {
    //     __resolveReference(reference) {
    //         return fetchUserById(reference.id);
    //       }
    // },
    Mutation: {
        register: async (parent:any, args:any, {redis, url, session}, info) => {
            const {email, password, confirmPassword, firstName, lastName} = args;
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
                    password : hashedPassword,
                    firstName,
                    lastName,
                    roleName: 'user'
                });
                await user.save();
                const link = await createConfirmEmailLink(url, user.id, redis);
                await sendEmail(email, link);
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