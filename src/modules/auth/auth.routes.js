import express from 'express';
import authController from './auth.controller.js';

const router = express.Router();

export default router;

router.route('/login').post(authController.login);

router.route('/register').post(authController.register);

router.route('/logout').get(authController.logout);
