import { adjustorCreateStockService } from "../services/stock.service.js";

export const adjustorCreateStock = async(req, res, next)=>{
    try {
        const stock = await adjustorCreateStockService(req.body);
        res.status(200).json({
            success:true,
            message:"Stock adjustment completed successfully",
            data:stock
        })

    } catch (error) {
        next(error)
    }
}

export const transferStock = async(req, res, next)=>{  // store -> store
    try {
        
    } catch (error) {
        next(error)
    }
}

export const getStocks = async(req, res, next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}