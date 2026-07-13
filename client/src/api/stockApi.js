import api from "./axios"

export const getStocks = async(threshold)=>{
    const url = threshold ? `stocks?threshold=${threshold}` :'stocks'
    const response = await api.get(url);
    return response
}

export const changeorCreateStock = async(data)=>{
    const response = await api.post('stocks/adjustorcreate',data);
    return response
}

export const transferStocks = async(data)=>{
    const response = await api.post('stocks/transferstoretostore',data);
    return response
}


