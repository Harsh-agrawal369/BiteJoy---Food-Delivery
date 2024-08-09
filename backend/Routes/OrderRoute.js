import express from 'express';
import {authMiddleware} from '../middleware/AuthMiddleware.js';
import { placeOrder, verifyOrder, userOrders } from '../controllers/OrderController.js';

const OrderRouter = express.Router();


OrderRouter.post('/place', authMiddleware, placeOrder);
OrderRouter.post('/verify', verifyOrder);
OrderRouter.post('/userOrders', authMiddleware, userOrders);


export default OrderRouter;