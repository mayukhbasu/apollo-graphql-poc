import * as jwt from 'jsonwebtoken';

export const getUser = token => {
    try {
        if(token) {
            return jwt.verify(token, 'secret');
        }
        
    } catch(err) {
        return null;
    }
}