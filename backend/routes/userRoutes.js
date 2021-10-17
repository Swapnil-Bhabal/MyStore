import express from 'express';

import { protect } from '../middleware/authMiddleware.js'
import { authUser, getUserProfile } from '../controller/userController.js';

const router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;