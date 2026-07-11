import express from 'express';
import { listProducts, newProduct } from '../controllers/product.controller.js';
import auth from '../middleware/auth.middleware.js';
import { roleAuth } from '../middleware/role.middleware.js';

const route = express.Router();

route.post('/new',auth,roleAuth('admin'), newProduct);
route.get('/list',auth, listProducts);

export default route;