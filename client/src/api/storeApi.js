import api from "./axios"

export const getStores = async()=>{
    const response = await api.get('stores');
    return response
}

export const newStore = async(data)=>{
    const response = await api.post('stores',data);
    return response
}