import * as categoryMethods from './category.method.js';

export const getCategories = async (req, res) => {
	try {
		const expenses = await categoryMethods.getCategories(req.user._id);
		res.status(200).send(expenses);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};
