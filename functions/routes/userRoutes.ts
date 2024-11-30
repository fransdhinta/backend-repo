import { Router } from 'express';
import { createUserData, fetchAllUserData, fetchUserData, updateUserData } from '../controller/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// router.post('/create-user', authMiddleware, createUserData);
// router.put('/update-user-data/:id', authMiddleware, updateUserData);
// router.get('/fetch-user-data/:id', authMiddleware, fetchUserData);

router.post('/user', authMiddleware, createUserData);
router.patch('/user/:id', authMiddleware, updateUserData);
router.get('/user/:id', authMiddleware, fetchUserData);
router.get('/user', authMiddleware, fetchAllUserData);

export default router;