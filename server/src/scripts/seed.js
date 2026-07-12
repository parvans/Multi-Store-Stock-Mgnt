import connectDB from "../config/db.js"
import Product from "../models/Product.js";
import Stock from "../models/Stock.js";
import Store from "../models/Store.js";


const seedData = async()=>{
    try {
        await connectDB();
        console.log("Cleaning Database...");
        await Stock.deleteMany()
        await Product.deleteMany();
        await Store.deleteMany()

        console.log("Creating Products...");

        const products = await Product.insertMany([
            {
                name:"iPhone 16 Pro",
                sku:"IP16-PRO"
            },
            {
                name:"Samsung Galaxy s23",
                sku:"SGS23"
            },
            {
                name:"Macbook Pro M4",
                sku:"MBP-M4"
            },
            {
                name:"Sony Alpha Mark5",
                sku:"SONY-AM5"
            },
        ])

        console.log("Creating Stores...");

        const stores = await Store.insertMany([
            {
                name:"MyG Digitals",
                address:"Railway station road, Kochi"
            },
            {
                name:"Oxygen Electronics",
                address:"Near Paragon, Kozhikode"
            },
            {
                name:"Ula  Gadgets",
                address:"Opposite new bus stand, Vadakara, Kozhikode"
            },
            {
                name:"E World",
                address:"Near Thrissur round, Thrissur"
            },
        ])

        console.log("Creating Stocks...");

        await Stock.insertMany([
            {
                product:products[0]._id,
                store:stores[0]._id,
                quantity:120
            },
            {
                product:products[0]._id,
                store:stores[1]._id,
                quantity:40
            },
            {
                product:products[0]._id,
                store:stores[2]._id,
                quantity:10
            },
            {
                product:products[1]._id,
                store:stores[0]._id,
                quantity:30
            },
            {
                product:products[1]._id,
                store:stores[1]._id,
                quantity:15
            },
            {
                product:products[2]._id,
                store:stores[0]._id,
                quantity:23
            },
            {
                product:products[2]._id,
                store:stores[2]._id,
                quantity:23
            },
            {
                product:products[3]._id,
                store:stores[1]._id,
                quantity:5
            },
        ])

        console.log("Database seeded completed");
        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
 
    }
}

seedData()