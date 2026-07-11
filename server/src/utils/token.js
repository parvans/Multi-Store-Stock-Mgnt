import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const generateToken = (userId, role) => {
    if(!ENV.JWT_SECRET){
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const token = jwt.sign({userId, role}, ENV.JWT_SECRET,{
        expiresIn:ENV.JWT_EXPIRATION
    });
    
    return token;
    
}