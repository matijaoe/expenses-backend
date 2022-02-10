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

// TODO: admin middlew
router.route('/').get([auth, admin], userController.getAllUsers);

export default router;
