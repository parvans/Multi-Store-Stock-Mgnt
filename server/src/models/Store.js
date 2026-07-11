import mongoose from "mongoose";


const storeSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Store name is required"],
            trim:true
        },
        address:{
            type:String,
            required:[true, "address is required"],
            trim:true
        }
    },
    {
        timestamps:true
    }
)

const Store = mongoose.model('Store',storeSchema);

export default Store