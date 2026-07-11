import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signUpService = async({
    name,
    email,
    password,
    role='shopper'
})=>{
    const userExist = await User.findOne({email});

    if(userExist){
        const error = new Error('Email already exist');
        error.statusCode = 409;
        throw error;
    }

    if(password.length < 6){
        const error = new Error('Password must be at least 6 characters');
        error.statusCode = 400;
        throw error;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]/
    if(!emailRegex.test(email)){
        const error = new Error('Invalid email format');
        error.statusCode = 400;
        throw error;
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password:hashPassword,
        role,
    });

    return user;
}

export const loginService = async({
    email,
    password,
})=>{
    const userExist = await User.findOne({email}).select("+password");

    if(!userExist){
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const verifyPassword = await bcrypt.compare(password, userExist.password)
    if(!verifyPassword){
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    return user;
}