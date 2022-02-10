import express from 'express';
import userController from './user.controller.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

router
	.get('/me', auth, userController.getCurrentUser)
	.patch('/me', auth, userController.updateCurrentUser)
	.delete('/me', auth, userController.deleteCurrentUser);

export default router;
