import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { roleAuth } from '../middleware/role.middleware.js';
import { adjustorCreateStock, getStocks, transferStock } from '../controllers/stock.controller.js';


const route = express.Router();

route.post('/adjustorcreate', auth, roleAuth('admin'), adjustorCreateStock);
route.post('/transferstoretostore', auth, roleAuth('admin'), transferStock);
route.get('/', auth, getStocks);

export default route;