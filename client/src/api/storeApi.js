import api from "./axios"

export const getStore = async()=>{
    const response = await api.get('stores');
    return response
}

export const newStore = async(data)=>{
    const response = await api.post('stores',data);
    return response
}