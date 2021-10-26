import express from 'express';
import { getProducts, getProductsbyId, deleteProduct, createProduct, updateProduct, createdProductReview, } from '../controller/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createdProductReview);
router
    .route('/:id')
    .get(getProductsbyId)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;