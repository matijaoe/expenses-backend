import express from 'express';

import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/user.routes.js';
import expenseRoutes from './modules/expenses/expense.routes.js';

const router = express.Router();

router
	.use(authRoutes)
	.use('/users', userRoutes)
	.use('/expenses', expenseRoutes);

export default router;
