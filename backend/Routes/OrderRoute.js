import express from 'express';
import {authMiddleware} from '../middleware/AuthMiddleware.js';
import { placeOrder, verifyOrder } from '../controllers/OrderController.js';

const OrderRouter = express.Router();


OrderRouter.post('/place', authMiddleware, placeOrder);
OrderRouter.post('/verify', verifyOrder);



export default OrderRouter;