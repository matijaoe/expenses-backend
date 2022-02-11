import express from 'express';
import * as categoryController from './category.controller.js';
import auth from '../../../middleware/auth.js';
import admin from '../../../middleware/admin.js';

const router = express.Router();

router.use(auth);

// for current user
router
	.route('/')
	.get(categoryController.getCategories)
	.post(categoryController.createCategory);

// for admin
router.route('/global').get([admin], categoryController.getGlobalCategories);

router
	.route('/:id')
	.get(categoryController.getCategory)
	.patch(categoryController.updateCategory)
	.delete(categoryController.deleteCategory);

export default router;
