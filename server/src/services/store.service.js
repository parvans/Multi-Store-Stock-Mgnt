import Store from "../models/Store.js";


export const createStoreService = async({
    name,
    address
})=>{
    if(!name || !address){
        const error = new Error("Name and Address are required");
        error.statusCode = 400;
        throw error;
    }

    const existStore = await Store.findOne({name});
    if(existStore){
        const error = new Error("Store already exist with this name");
        error.statusCode = 400;
        throw error;
    }

    const store = await Store.create({
        name,
        address
    });

    return store;
}

export const getStoresService = async()=>{
    const stores = await Store.find().sort({
        createdAt:-1
    });

    return stores;
}