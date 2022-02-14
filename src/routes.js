import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import budgetRoutes from './modules/budget/budget.routes.js';
import categoryRoutes from './modules/expenses/categories/category.routes.js';
import expenseRoutes from './modules/expenses/expense.routes.js';
import userRoutes from './modules/user/user.routes.js';

const router = express.Router();

router
	.use(authRoutes)
	.use('/users', userRoutes)
	.use('/expenses', expenseRoutes)
	.use('/categories', categoryRoutes)
	.use('/budget', budgetRoutes);

export default router;
