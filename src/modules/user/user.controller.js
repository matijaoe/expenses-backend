import userMethods from './user.method.js';

const getCurrentUser = (req, res) => {
	console.log(req.user);
	res.status(200).send(req.user);
};

const updateCurrentUser = async (req, res) => {
	const updates = Object.keys(req.body);
	const isValidOperation = isValidUpdate(updates);

	if (!isValidOperation) {
		return res.status().send({ error: 'Invalid updates.' });
	}
	try {
		updates.forEach((update) => (req.user[update] = req.body[update]));
		await req.user.save();
		res.status(202).send(req.user);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const deleteCurrentUser = async (req, res) => {
	try {
		await req.user.remove();
		res.status(200).send({ message: 'User deleted' });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await userMethods.listUsers();
		if (!users) {
			return res.status(404).send({ error: 'Users not found.' });
		}
		res.status(200).send(users);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await userMethods.getUserById(id);
		if (!user) {
			return res.status(404).send({ error: 'User not found.' });
		}
		res.send(user);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const updates = Object.keys(req.body);

		if (!isValidUpdate(updates)) {
			return res.status(400).send({ error: 'Invalid updates.' });
		}

		const user = await userMethods.updateUser(id, req.body);
		res.status(202).send(user);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await userMethods.deleteUser(id);
		if (!user) {
			return res.status(404).send({ error: 'User not found.' });
		}
		res.send(user);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const isValidUpdate = (updates) => {
	const allowedUpdates = ['name', 'email', 'password', 'role'];
	return updates.every((val) => allowedUpdates.includes(val));
};

export default {
	getCurrentUser,
	updateCurrentUser,
	deleteCurrentUser,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	isValidUpdate,
};
