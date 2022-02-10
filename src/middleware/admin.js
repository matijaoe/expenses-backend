const auth = async (req, res, next) => {
	try {
		if (req?.user.role !== 'admin') {
			throw new Error('Missing admin privilegies.');
		}
		next();
	} catch (err) {
		res.status(401).send({ error: err.message });
	}
};

export default auth;
