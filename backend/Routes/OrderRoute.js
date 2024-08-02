import express from 'express';
import {authMiddleware} from '../Middleware/AuthMiddleware.js';
import { placeOrder } from '../controllers/OrderController.js';

const OrderRouter = express.Router();


OrderRouter.post('/place', authMiddleware, placeOrder);



export default OrderRouter;