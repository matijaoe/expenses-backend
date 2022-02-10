import userMethods from '../user/user.method.js';

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { user, token } = await userMethods.loginUser(email, password);

		if (!user) {
			return res.status(400).send({ error: 'User not found.' });
		}

		res.status(200).send({ user, token });
	} catch (err) {
		res.status(404).send({ error: err.message });
	}
};

const register = async (req, res) => {
	try {
		const user = await userMethods.createUser(req.body);
		res.status(201).send(user);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const logout = async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send('Logged out');
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export default {
	login,
	register,
	logout,
};
