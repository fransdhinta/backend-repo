import { Router } from 'express';
import { login, register } from '../controller/authController';
// import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// router.post('/create-user', authMiddleware, createUserData);
// router.put('/update-user-data/:id', authMiddleware, updateUserData);
// router.get('/fetch-user-data/:id', authMiddleware, fetchUserData);

router.post('/auth/register', register);
router.post('/auth/login', login);

export default router;