import api from "./axios"

export const getProduct = async()=>{
    const response = await api.get('products');
    return response
}
export const newProduct = async(data)=>{
    const response = await api.post('products',data);
    return response
}