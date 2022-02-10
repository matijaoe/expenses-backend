import jwt from 'jsonwebtoken';
import User from '../modules/user/user.model.js';

const auth = async (req, res, next) => {
	try {
		const [, token] = req.header('Authorization').split(' ');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({
			_id: decoded._id,
			'tokens.token': token,
		});

		if (!user) {
			throw new Error('User not found');
		}

		req.token = token;
		req.user = user;
		next();
	} catch (err) {
		res.status(401).send({ err: 'Please authenticate.' });
	}
};

export default auth;
