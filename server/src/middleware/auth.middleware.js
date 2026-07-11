import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js'

const auth = async(req,res,next)=>{
    const authHeader = req.header("Authorization");

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            success:false,
            message:"Authorization token missing"
        });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded=jwt.verify(token,ENV.JWT_SECRET)
        req.user=decoded
        next(); 
    } catch (error) { 
        res.status(401).json({
            success:false,
            message:error.message || "Invalid or expired token"
        })
    } 
}

export default auth;