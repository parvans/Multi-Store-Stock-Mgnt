import express from 'express';
import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;

const  startServer = async()=>{
    try {
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:");
        console.error(error);
        process.exit(1);
    }
};

startServer();
