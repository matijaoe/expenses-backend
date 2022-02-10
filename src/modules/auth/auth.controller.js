import userMethods from '../user/user.method.js';

const login = () => {};
const register = async (req, res) => {
	console.log('register');
	try {
		const user = await userMethods.createUser(req.body);
		res.status(200).send(user);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};
const logout = () => {};

export default {
	login,
	register,
	logout,
};
