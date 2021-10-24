import express from 'express';

import { protect, admin } from '../middleware/authMiddleware.js'
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile, deleteUser, getUserById, updateUser, } from '../controller/userController.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;