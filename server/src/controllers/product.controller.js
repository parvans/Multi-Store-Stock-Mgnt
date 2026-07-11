import { createProductService, getProductsService } from "../services/product.service.js"


export const newProduct = async(req, res, next)=>{
    try {
        const product = await createProductService(req.body);
        res.status(201).json({
            success:true,
            message:"Product created successfully",
            data:product
        });
    } catch (error) {
        next(error);
    }
}
export const listProducts = async(req, res, next)=>{
    try {
        const products = await getProductsService();
        res.status(201).json({
            success:true,
            count: products.length, 
            data:products
        });
    } catch (error) {
        next(error);
    }
}