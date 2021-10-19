import express from 'express';
import { addOrderItems } from '../controller/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import router from './productRoutes.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);

export default router;