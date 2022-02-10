/* eslint-disable no-unreachable */
const getCurrentUser = (req, res) => {
	console.log(req.user);
	res.status(200).send(req.user);
};

const updateCurrentUser = async (req, res) => {
	const updates = Object.keys(req.body);
	console.log('updates :>> ', updates);
	const allowedUpdates = ['name', 'email', 'password'];

	const isValidOperation = updates.every((val) => allowedUpdates.includes(val));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
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
		res.status(200).send('User deleted');
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export default {
	getCurrentUser,
	updateCurrentUser,
	deleteCurrentUser,
};
