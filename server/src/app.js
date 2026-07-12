import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import storeRoutes from './routes/store.routes.js'
import stockRoutes from './routes/stock.routes.js'
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api', (_, res) => res.json({ status: 'ok', timestamp: new Date() }));
app.use(
    "/api-doc",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec)
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/stocks", stockRoutes);

app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:"Route not found"
    });
});
app.use((err, req, res, next)=>{
    console.error(err);

    res.status(err.statusCode || 500).json({
        success:false,
        message: err.message || "Internal Server Error"
    });
});


export default app;




