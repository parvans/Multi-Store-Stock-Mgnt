import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js'

const auth = async(req,res,next)=>{
    const token=req.header("Authorization")
    if(!token) return res.status(403).json({message:'forbidden - token is unavailable'}) 
    try {
        const decoded=jwt.verify(token,ENV.JWT_SECRET)
        req.user=decoded
        next(); 
    } catch (error) { 
        res.status(401).json({message:error.message})
    } 
}

export default auth;