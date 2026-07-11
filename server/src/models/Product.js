import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Product Name is required"],
            trim:true
        },
        sku:{
            type:String,
            required:[true, "SKU is required"],
            unique:true,
            uppercase:true,
            trim:true
        }
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model('Product',productSchema);

export default Product