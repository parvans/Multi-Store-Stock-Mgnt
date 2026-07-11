import { createStoreService, getStoresService } from "../services/store.service.js";

export const newStore = async(req, res, next)=>{
    try {
        const store = await createStoreService(req.body);
        res.status(201).json({
            success:true,
            message:"Store create successfully",
            data:store
        });
    } catch (error) {
        next(error);
    }
}
export const getStores = async(req, res, next)=>{
    try {
        const stores = await getStoresService();
        res.status(201).json({
            success:true,
            count:stores.length,
            data:stores
        });
    } catch (error) {
        next(error);
    }
}