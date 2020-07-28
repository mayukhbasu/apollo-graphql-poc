import * as jwt from 'jsonwebtoken';

export const getUser = token => {
    try{
        const decoded = jwt.verify(token, 'secret');
        console.log(decoded);
        return decoded;
    } catch(err) {
        console.log(err);
    }
}

// export const getToken = token => {
//     try{
//         const decoded = jwt.verify(token, 'secret');
//         return decoded;
//     } catch(err) {
//         console.log(err);
//     }
// }