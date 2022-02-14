import express from 'express';
import auth from '../../middleware/auth.js';
import * as budgetController from './budget.controller.js';

const router = express.Router();

router
	.route('/')
	.get(auth, budgetController.getBudget)
	.post(auth, budgetController.createBudget)
	.patch(auth, budgetController.updateBudget);

export default router;
