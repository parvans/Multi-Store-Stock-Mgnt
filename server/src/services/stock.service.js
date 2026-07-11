import Product from "../models/Product.js";
import Stock from "../models/Stock.js";
import Store from "../models/Store.js";


export const adjustorCreateStockService = async({
    productId,
    storeId,
    quantity
})=>{
    if(!productId || !storeId){
        const error = new Error("Product and Store are required");
        error.statusCode = 400;
        throw error;
    }

    if(quantity ===0){
        const error = new Error("Quantity Cannot be zero");
        error.statusCode = 400;
        throw error;
    }

    const product = await Product.findById(productId);
    if(!product){
         const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }
    const store = await Store.findById(storeId);
    if(!store){
         const error = new Error("Store not found");
        error.statusCode = 404;
        throw error;
    }

    let stock = await Stock.findOne({
        product:productId,
        store:storeId
    })

    if(!stock){ // if no stock , then create
        if(quantity<0){
            const error = new Error("Cannot reduce stock that does not exist");
            error.statusCode = 400;
            throw error;
        }

        stock = await Stock.create({
            product:productId,
            store:storeId,
            quantity
        })

        return stock
    }

    if(quantity<0){
        stock = await Stock.findOneAndUpdate({
            product:productId,
            store:storeId,
            quantity:{
                $gte:Math.abs(quantity)
            },
        },{
            $inc:{
                quantity,
            }
        },{
            new:true
        })

        if(!stock){
            const error = new Error("Insufficient stock");
            error.statusCode = 400;
            throw error;
        }

        return stock
    }

    //normal
    stock = await Stock.findOneAndUpdate({
        product:productId,
        store:storeId,
    },
    {
        $inc:{
            quantity
        }
    },{
        new:true
    })

    return stock
}