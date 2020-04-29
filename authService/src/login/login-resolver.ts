import * as bcrypt from 'bcryptjs';
import { User } from '../entities/User';
import * as jwt from 'jsonwebtoken';
import { userSessionIdPrefix } from '../constants';
import { getUser } from '../utils/getUser';

export const loginResolver: any = {
    Query: {
        me(parent:any, args:any, {session}, info) {
         
          return { id: "1", username: "@ava" }
        }
      },
    
    Mutation: {
        login: async (parent:any, args:any, {redis, session, req, res}, info) => {
            console.log(res);
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
                
                session.userId = user.id; //Login successful
                const token = jwt.sign(
                    {
                      id: user.id,
                      username: user.email,
                    },
                    'secret',
                    {
                      expiresIn: '1d', // token will expire in 30days
                    },
                  );
                  const refreshToken = jwt.sign(
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
                      
                      await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
                  }
                  res.cookie("refresh-token", refreshToken);
                  res.cookie("access-token", token);
                  return {
                          token,
                          user,
                          message: "Login Successful"
                      }
        }
    }
}