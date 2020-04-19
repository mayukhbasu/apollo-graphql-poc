import * as bcrypt from 'bcryptjs';
import { User } from './entities/User';
import * as jwt from 'jsonwebtoken';

export const resolvers: any = {
    Query: {
        me() {
          return { id: "1", username: "@ava" }
        }
      },
      
    Mutation: {
        login: async (parent:any, args:any, context, info) => {
            
            
            const {email, password} = args;
            
            const user = await User.findOne({where: {email}});
            if (!user) {
                throw new Error('Invalid Login')
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            const token = jwt.sign(
                {
                  id: user.id,
                  username: user.email,
                },
                'my-secret-from-env-file-in-prod',
                {
                  expiresIn: '30d', // token will expire in 30days
                },
              )
              return {
                  token,
                  user
              }

        }
    }
}