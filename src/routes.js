import express from 'express';

import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/user.routes.js';

const router = express.Router();

// mount auth routes at /auth
router.use(authRoutes);
router.use('/users', userRoutes);

export default router;
