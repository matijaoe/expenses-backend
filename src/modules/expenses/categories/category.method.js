import Category from './category.model.js';

export const getCategories = async (owner = null) => {
	const filter =
		owner === null ? { owner: null } : { $or: [{ owner }, { owner: null }] };
	try {
		return await Category.find(filter);
	} catch (err) {
		throw new Error('Error fetching categories');
	}
};

export const getCategory = async (_id, owner) => {
	try {
		return await Category.findOne({ _id, $or: [{ owner }, { owner: null }] });
	} catch (err) {
		throw new Error('Error fetching expense');
	}
};

export const createCategory = async (categoryData, owner) => {
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

export const deleteCategory = async (_id, owner) => {
	try {
		return await Category.findOneAndDelete({ _id, owner });
	} catch (err) {
		throw new Error('Error deleting expense');
	}
};
