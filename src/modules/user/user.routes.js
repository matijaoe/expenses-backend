import express from 'express';
import userController from './user.controller.js';

const router = express.Router();

router
	.route('me')
	.get(userController.getCurrentUser)
	.patch(userController.updateCurrentUser)
	.delete(userController.deleteCurrentUser);

export default router;
