import * as bcrypt from 'bcryptjs';
import { User } from '../entities/User';
import * as jwt from 'jsonwebtoken';
import { userSessionIdPrefix } from '../constants';

export const loginResolver: any = {
    Query: {
        me(parent:any, args:any, {session}, info) {
          console.log(session);   
          return { id: "1", username: "@ava" }
        }
        
      },
    
    Mutation: {
        login: async (parent:any, args:any, {redis, session, req}, info) => {
            console.log(req.sessionID);
            const {email, password} = args;
            const user = await User.findOne({where: {email}});
            if(!user) {
                return {
                    token: null,
                    user: null,
                    message: "Invalid Login"
                }
            }
            if(!user.confirmed) {
                return {
                    token: null,
                    user: null,
                    message: "User has not confirmed by email"
                }
            }
            
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (!passwordMatch) {
                console.log(passwordMatch);
                return {
                    user: null,
                    token: null,
                    message: "Invalid Login"
                }
            }   
                console.log(session);
                session.userId = user.id; //Login successful
                const token = jwt.sign(
                    {
                      id: user.id,
                      username: user.email,
                    },
                    'secret',
                    {
                      expiresIn: '30d', // token will expire in 30days
                    },
                  );
                  if(req.sessionID && user.id) {
                      console.log(req.sessionID);
                      await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
                  }
                  return {
                          token,
                          user,
                          message: "Login Successful"
                      }
        }
    }
}