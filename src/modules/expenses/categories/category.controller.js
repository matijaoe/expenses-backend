import * as categoryMethods from './category.method.js';

export const getCategories = async (req, res) => {
	const { globalOnly } = req.query;
	try {
		const expenses = await categoryMethods.getCategories(
			globalOnly == 'true' ? null : req.user._id
		);
		res.status(200).send(expenses);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const getCategory = async (req, res) => {
	const { id } = req.params;
	try {
		const category = await categoryMethods.getCategory(id, req.user._id);

		if (!category) {
			return res.status(404).send({ error: 'Category not found.' });
		}

		res.status(200).send(category);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const addCategory = async (req, res) => {
	try {
		const category = await categoryMethods.createCategory(
			req.body,
			req.user.id
		);
		res.status(201).send(category);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const addGlobalCategory = async (req, res) => {
	try {
		const category = await categoryMethods.createCategory(req.body, null);
		res.status(201).send(category);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const deleteCategory = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedCategory = await categoryMethods.deleteCategory(
			id,
			req.user._id
		);

		if (!deletedCategory) {
			return res.status(404).send({ error: 'Category not found.' });
		}

		return res.status(200).send(deletedCategory);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const deleteGlobalCategory = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedCategory = await categoryMethods.deleteCategory(id, null);

		if (!deletedCategory) {
			return res.status(404).send({ error: 'Category not found.' });
		}

		return res.status(200).send(deletedCategory);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};
