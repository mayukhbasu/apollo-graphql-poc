import * as jwt from 'jsonwebtoken';

export function getUser(token){
    try{
        const decoded:any = jwt.verify(token, 'secret');
        console.log("Decoded token");
        console.log("Type");
        console.log(decoded.id);
        return decoded.id;
    } catch(err) {
        console.log(err);
    }
}