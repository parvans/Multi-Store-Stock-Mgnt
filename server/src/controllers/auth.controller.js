import { loginService, signUpService } from "../services/auth.service.js"
import { generateToken } from "../utils/token.js";


export const signUp = async(req, res, next)=>{
    try {
        const user = await signUpService(req.body);
        const token = generateToken(user._id, user.role);
        res.status(201).json({
            success:true,
            message:"User created successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });

    } catch (error) {
        next(error);
    }
}

export const login = async(req, res, next)=>{
    try {
        const user = await loginService(req.body);
        const token = generateToken(user._id, user.role);

        res.status(201).json({
            success:true,
            message:"User Login successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });

    } catch (error) {
         next(error); 
    }
}