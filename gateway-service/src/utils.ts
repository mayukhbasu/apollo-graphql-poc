import * as jwt from 'jsonwebtoken';

export const getUser = token => {
    try {
        if(token) {
            console.log(jwt.verify(token, 'secret'))
            return jwt.verify(token, 'secret');
        }
        
    } catch(err) {
        return null;
    }
}