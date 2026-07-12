import axios from "axios";
const BASE_URL = 'http://localhost:3001/api/'
const api = axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":'application/json'
    }
})

api.interceptors.request.use((conf)=>{
    const token = localStorage.getItem('token');
    if(token){
        conf.headers.Authorization = `Bearer ${token}`
    }
    return conf
})

export default api