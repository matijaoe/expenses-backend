import User from '../user/user.model.js';

const createUser = async (userData) => {
	const user = new User(userData);
	const err = user.validateSync();
	if (err) {
		const errorMsgs = Object.values(err.errors).reduce(
			(acc, val) => [...acc, val],
			[]
		);
		throw new Error(errorMsgs.join(' '));
	}

	try {
		await user.save();
		return user;
	} catch (err) {
		throw new Error(err.message);
	}
};

const loginUser = async (email, password) => {
	try {
		const user = await User.findByCredentials(email, password);
		const token = await user.generateAuthToken();

		if (!user) {
			throw new Error('User not found');
		}

		return { user, token };
	} catch (err) {
		throw new Error(err.message);
	}
};

export default {
	createUser,
	loginUser,
};
