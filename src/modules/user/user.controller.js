import * as userMethods from './user.method.js';

export const getCurrentUser = (req, res) => {
	console.log(req.user);
	res.status(200).send(req.user);
};

export const updateCurrentUser = async (req, res) => {
	const updates = Object.keys(req.body);
	const isValidOperation = isValidUpdate(updates);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates.' });
	}
	try {
		updates.forEach((update) => (req.user[update] = req.body[update]));
		await req.user.save();
		res.status(202).send(req.user);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const deleteCurrentUser = async (req, res) => {
	try {
		await req.user.remove();
		res.status(200).send({ message: 'User deleted' });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const getAllUsers = async (req, res) => {
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

export const getUser = async (req, res) => {
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

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const updates = Object.keys(req.body);

		if (!isValidUpdate(updates, req.isAdmin)) {
			return res.status(400).send({ error: 'Invalid updates.' });
		}
		// TODO: password update doesnt work
		const user = await userMethods.updateUser(id, req.body);
		res.status(202).send(user);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const deleteUser = async (req, res) => {
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

const isValidUpdate = (updates, isAdmin = false) => {
	const allowedUpdates = ['name', 'email', 'password'];
	if (isAdmin) {
		allowedUpdates.push('role');
		allowedUpdates.splice(updates.indexOf('password'), 1);
	}
	return updates.every((val) => allowedUpdates.includes(val));
};
