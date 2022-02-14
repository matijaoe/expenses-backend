import Budget from './budget.model.js';

export const getBudget = async (owner) => {
	try {
		return await Budget.findOne({ owner });
	} catch (err) {
		throw new Error('Error fetching budget');
	}
};

export const createBudget = async (budgetData, owner) => {
	const budget = new Budget({ ...budgetData, owner });

	const err = budget.validateSync();
	if (err) {
		const errorMsgs = Object.values(err.errors).reduce(
			(acc, val) => [...acc, val],
			[]
		);
		throw new Error(errorMsgs.join(' '));
	}

	try {
		return await budget.save();
	} catch (err) {
		throw new Error('Error creating budget.');
	}
};

export const updateBudget = async (updates, owner) => {
	try {
		const budget = await Budget.findOneAndUpdate({ owner }, updates, {
			new: true,
			runValidators: true,
		});
		return budget;
	} catch (err) {
		throw new Error('Error updating budget.');
	}
};
