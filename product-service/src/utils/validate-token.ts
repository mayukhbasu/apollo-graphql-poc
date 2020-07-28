import * as jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, 'secret');
        if(decoded){
            next();
        }
    } catch(err) {
        return next();
    }
}



export const getUser = token => {
    try{
        const decoded = jwt.verify(token, 'secret');
        console.log(decoded);
        return decoded;
    } catch(err) {
        console.log(err);
    }
}