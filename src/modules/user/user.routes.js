import express from 'express';
import userController from './user.controller.js';
import auth from '../../middleware/auth.js';
import admin from '../../middleware/admin.js';

const router = express.Router();

router
	.route('/me')
	.get(auth, userController.getCurrentUser)
	.patch(auth, userController.updateCurrentUser)
	.delete(auth, userController.deleteCurrentUser);

router.route('/').get([auth, admin], userController.getAllUsers);

router
	.route('/:id')
	.get([auth, admin], userController.getUser)
	.patch([auth, admin], userController.updateUser)
	.delete([auth, admin], userController.deleteUser);

export default router;
