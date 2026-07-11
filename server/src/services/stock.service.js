import mongoose from "mongoose";
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

        stock = await Stock.create({ // create stock if a stock with product and store id not exist
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

export const getStocksService = async({threshold})=>{
    const filter = {};

    if(threshold !==undefined){
        filter.quantity={
            $lte:Number(threshold)
        }
    }

    const stocks = await Stock.find(filter)
        .populate('product','name sku')
        .populate('store','name address')
        .sort({quantity:1})

    return stocks

}

export const transferStoreToStoreService = async({
    productId,
    sourceStoreId,
    destinStoreId,
    quantity
})=>{
    if(!productId ||
       !sourceStoreId ||
       !destinStoreId || 
       quantity === undefined
    ){
        const error = new Error("All fields required");
        error.statusCode = 400;
        throw error;
    }

    if(quantity <= 0){
        const error = new Error("Transfer Quantity must be grater than zero");
        error.statusCode = 400;
        throw error;
    }

    if(sourceStoreId === destinStoreId){
        const error = new Error("Cannot transfer to the same store");
        error.statusCode = 400;
        throw error;
    }

    const [product, sourceStore, destinStore] = await Promise.all([
        Product.findById(productId),
        Store.findById(sourceStoreId),
        Store.findById(destinStoreId)
    ])

    if(!product){
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }
    if(!sourceStore){
        const error = new Error("Source Store not found");
        error.statusCode = 404;
        throw error;
    }
    if(!destinStore){
        const error = new Error("Destination Store not found");
        error.statusCode = 404;
        throw error;
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // removing stocks from source store only if quantity >= requested quantity
        const sourceStock = await Stock.findOneAndUpdate({
            product:productId,
            store:sourceStoreId,
            quantity:{
                $gte:quantity
            }
        },{
            $inc:{
                quantity:-quantity
            }
        },{
            new:true,
            session
        })

        if(!sourceStock){
            const error = new Error("Insufficient stock");
            error.statusCode = 400;
            throw error;
        }

        const destinStock = await Stock.findOne({
            product:productId,
            store:destinStoreId
        }).session(session)

        if(destinStock){
            destinStock.quantity += quantity;
            await destinStock.save({session})
        }else{
            await Stock.create([
                {
                    product:productId,
                    store:destinStoreId,
                    quantity:quantity
                }
            ],
            {
                session
            })
        }

        await session.commitTransaction();

        return{
            source:sourceStock
        }

    } catch (error) {
        await session.abortTransaction();
        throw error;
    }finally{
        session.endSession();
    }
}