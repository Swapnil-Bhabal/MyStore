import express from 'express';
import { getProducts, getProductsbyId } from '../controller/productController.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductsbyId);

export default router;