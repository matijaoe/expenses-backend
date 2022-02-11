const auth = async (req, res, next) => {
	try {
		const isAdmin = req?.user.role === 'admin' ?? false;
		if (!isAdmin) {
			throw new Error('Missing admin privilegies.');
		}
		req.isAdmin = isAdmin;
		next();
	} catch (err) {
		res.status(401).send({ error: err.message });
	}
};

export default auth;
