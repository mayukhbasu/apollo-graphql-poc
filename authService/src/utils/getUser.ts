import * as jwt from 'jsonwebtoken';

export const getUser = token => {
    try{
        const decoded = jwt.verify(token, 'secret');
        console.log("Decoded token");
        console.log(decoded);
        return decoded;
    } catch(err) {
        console.log(err);
    }
}