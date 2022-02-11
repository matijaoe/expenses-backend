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
	.post(categoryController.addCategory);

// for admin
router.route('/global').post([admin], categoryController.addGlobalCategory);

router
	.route('/global/:id')
	.delete([admin], categoryController.deleteGlobalCategory);

router
	.route('/:id')
	.get(categoryController.getCategory)
	.delete(categoryController.deleteCategory);

export default router;
