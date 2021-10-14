import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.json(products);
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'ERROR' });
        }
    })
);

export default router;