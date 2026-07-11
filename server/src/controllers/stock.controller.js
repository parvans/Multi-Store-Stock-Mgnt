import { adjustorCreateStockService, getStocksService } from "../services/stock.service.js";

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

export const getStocks = async(req, res, next)=>{
    try {
        const stocks = await getStocksService(req.query);
        res.status(200).json({
            success:true,
            count:stocks.length,
            data:stocks
        })
    } catch (error) {
        next(error)
    }
}

export const transferStock = async(req, res, next)=>{  // store -> store
    try {
        const result = await transferStoreToStoreService(req.body);
        res.status(200).json({
            success:true,
            message:"Stock transfered successfully",
            data:result
        })
    } catch (error) {
        next(error)
    }
}

