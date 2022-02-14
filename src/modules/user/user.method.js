import User from '../user/user.model.js';

export const createUser = async (userData) => {
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
		const count = await User.countDocuments({ email: user.email });

		if (count > 0) {
			throw new Error('User already registered.');
		}

		await user.save();
		const token = await user.generateAuthToken();
		return { user, token };
	} catch (err) {
		throw new Error(err.message || 'Error registering user.');
	}
};

export const loginUser = async (email, password) => {
	try {
		const user = await User.findByCredentials(email, password);
		const token = await user.generateAuthToken();

		return { user, token };
	} catch (err) {
		throw new Error(err.message);
	}
};

export const listUsers = async () => {
	try {
		return await User.find({});
	} catch (err) {
		throw new Error('Error fetching users.');
	}
};

export const getUserById = async (id) => {
	try {
		return await User.findById(id);
	} catch (err) {
		throw new Error('Error fetching user');
	}
};

// TODO: password update doesnt work (pre actions aint running)
export const updateUser = async (_id, updates) => {
	try {
		const user = await User.findOneAndUpdate({ _id }, updates, {
			new: true,
			runValidators: true,
		});
		return user;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const deleteUser = async (_id) => {
	try {
		return await User.findOneAndDelete({ _id });
	} catch (err) {
		throw new Error('Error deleting user');
	}
};
