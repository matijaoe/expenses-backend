import express from 'express';
import res from 'express/lib/response.js';
import authController from './auth.controller.js';

const router = express.Router();

import User from '../user/user.model.js';

export default router;

router.route('/test').get(async (req, res) => {
	try {
		// const user = await userMethods.createUser(body);
		const users = await User.find({});
		console.log('users :>> ', users);
		res.status(200).send({ users });
	} catch (err) {
		console.log('error happened', err);
	}
});

router.route('/login').post(authController.login);

router.route('/register').post(authController.register);

router.route('/logout').get(authController.logout);
