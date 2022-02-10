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
		const saved = await user.save();
		console.log(saved);
		return user;
	} catch (err) {
		throw new Error('Error creating user');
	}
};

export default {
	createUser,
};
