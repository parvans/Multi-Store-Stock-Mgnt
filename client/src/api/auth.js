import api from "./axios"


export const userLogin = async(data)=>{
    const response = await api.post("auth/login",data);
    return response;
}

export const userSignup = async(data)=>{
    const response = await api.post("auth/signup",data);
    return response;
}