import * as bcrypt from 'bcryptjs';
import { User } from '../entities/User';
import * as jwt from 'jsonwebtoken';
import { userSessionIdPrefix , accessTokenPrefix} from '../constants';
import { getUser } from '../utils/getUser';
import { access } from 'fs';

export const loginResolver: any = {
    Query:  {
        getUserInfo: async(parent:any, args:any, {session, req}, info) => {
          console.log(getUser(req.headers.authorization))
          
          return "Hello Mayukh"
        }
      },
    
    Mutation: {
        login: async (parent:any, args:any, {redis, session, req, res}, info) => {
            
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
                console.log("Here is the issue")
                return {
                    token: null,
                    user: null,
                    message: "User has not confirmed by email"
                }
            }
            
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (!passwordMatch) {
                return {
                    user: null,
                    token: null,
                    message: "Invalid Login"
                }
            }   
                
                session.userId = user.id; //Login successful
                const accessToken = jwt.sign(
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
                      await redis.lpush(`${accessTokenPrefix}${user.id}`, accessToken);
                  }
                  
                  res.setHeader('accessToken', `${refreshToken}`);
                  res.setHeader('refreshToken', `${accessToken}`);
                  return {
                          user,
                          message: "Login Successful"
                      }
        }
    }
}