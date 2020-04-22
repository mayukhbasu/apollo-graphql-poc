
import * as yup from 'yup';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/User';

const schema = yup.object().shape({
    email: yup.string().min(1).max(255).email(),
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
        register: async (parent:any, args:any, context, info) => {
            const {email, password, confirmPassword} = args;
            try {
                schema.validate(args, {abortEarly: false})
            } catch(err) {
                console.log(err);
            }
            const userAlreadyExists = await User.findOne({where: {email}});
            console.log(userAlreadyExists)
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