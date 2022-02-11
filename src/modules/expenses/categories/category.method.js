import Category from './category.model.js';

export const getCategories = async (userId) => {
	try {
		return await Category.find({ $or: [{ owner: userId }, { owner: null }] });
	} catch (err) {
		throw new Error('Error fetching categories');
	}
};

export const createCategory = async (categoryData, owner = null) => {
	const category = new Category({ ...categoryData, owner });

	const err = category.validateSync();
	if (err) {
		const errorMsgs = Object.values(err.errors).reduce(
			(acc, val) => [...acc, val],
			[]
		);
		throw new Error(errorMsgs.join(' '));
	}

	try {
		return await category.save();
	} catch (err) {
		throw new Error('Error creating category.');
	}
};
