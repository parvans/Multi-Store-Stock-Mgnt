import express from 'express';
import app from './app.js';

const PORT = process.env.PORT || 3001;

const  startServer = async()=>{
    try {
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
