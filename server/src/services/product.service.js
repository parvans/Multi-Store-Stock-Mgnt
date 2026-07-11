import Product from "../models/Product.js";


export const createProductService = async({
    name,
    sku
})=>{
    if(!name || !sku){
        const error = new Error("Name and SKU are required");
        error.statusCode = 400;
        throw error;
    }

    const existProduct = await Product.findOne({sku});
    if(existProduct){
        const error = new Error("Product already exist with the same SKU");
        error.statusCode = 409;
        throw error;
    }

    const product = await Product.create({
        name,
        sku
    });

    return product;
}

export const getProductsService = async()=>{
    const products = await Product.find().sort({
        createdAt:-1
    });
    return products;
}