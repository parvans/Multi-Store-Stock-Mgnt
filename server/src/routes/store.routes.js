import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { roleAuth } from '../middleware/role.middleware.js';
import { getStores, newStore } from '../controllers/store.controller.js';

const route = express.Router();

route.post('/', auth, roleAuth('admin'),newStore);
route.get('/', auth,getStores);

export default route;