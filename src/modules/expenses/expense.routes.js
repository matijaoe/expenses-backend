import express from 'express';
import * as expenseController from './expense.controller.js';
import auth from '../../middleware/auth.js';

const router = express.Router();


router.use(auth);

router
	.route('/')
	.get(expenseController.getExpenses)
	.post(expenseController.createExpense);

router
	.route('/:id')
	.get(expenseController.getExpense)
	.patch(expenseController.updateExpense)
	.delete(expenseController.deleteExpense);

export default router;
