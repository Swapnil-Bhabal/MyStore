import express from 'express';
import { getProducts, getProductsbyId, deleteProduct } from '../controller/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router
    .route('/:id')
    .get(getProductsbyId)
    .delete(protect, admin, deleteProduct);

export default router;