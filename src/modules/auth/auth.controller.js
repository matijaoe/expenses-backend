import userMethods from '../user/user.method.js';

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { user, token } = await userMethods.loginUser(email, password);
		res.status(200).send({ user, token });
	} catch (error) {
		res.status(400).send({ error: error.message });
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
