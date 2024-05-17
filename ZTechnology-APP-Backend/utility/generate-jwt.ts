import jwt from 'jsonwebtoken';

const generateJWT = (id = '') => {

    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.SECRET_PRIVATE_KEY || '', {
            expiresIn: "1h"
        }, (err, token) => {
            if (err) {
                console.log(err);
            reject('No se puedo generar el TOKEN');
            } else {
            resolve(token);
        }
        });
        })
    }

    export default generateJWT;