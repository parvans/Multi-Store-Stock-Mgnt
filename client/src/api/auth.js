import api from "./axios"


export const userLogin = (data)=>{
    api.post("auth/login",data);
}

export const userSignup = (data)=>{
    api.post("auth/signup",data);
}