import express from 'express';
import * as authController from './auth.controller.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

export default router;

router.route('/login').post(authController.login);

router.route('/register').post(authController.register);

router.route('/logout').get(auth, authController.logout);
