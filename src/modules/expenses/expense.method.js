import Expense from './expense.model.js';

const listExpenses = async (userId) => {
	try {
		return await Expense.find({ owner: userId });
	} catch (err) {
		throw new Error('Error fetching expenses');
	}
};

const getExpense = async (_id, owner) => {
	try {
		return await Expense.findOne({ _id, owner });
	} catch (err) {
		throw new Error('Error fetching expense');
	}
};

const createExpense = async (owner, expenseData) => {
	const expense = new Expense({ ...expenseData, owner });

	const err = expense.validateSync();
	if (err) {
		const errorMsgs = Object.values(err.errors).reduce(
			(acc, val) => [...acc, val],
			[]
		);
		throw new Error(errorMsgs.join(' '));
	}

	try {
		await expense.save();
		return expense;
	} catch (err) {
		throw new Error('Error creating expense');
	}
};

const updateExpense = async (_id, expenseData, owner) => {
	try {
		return await Expense.findOneAndUpdate({ _id, owner }, expenseData, {
			new: true,
			runValidators: true,
		});
	} catch (err) {
		throw new Error(err.message);
	}
};

const deleteExpense = async (_id, owner) => {
	try {
		return await Expense.findOneAndDelete({ _id, owner });
	} catch (err) {
		throw new Error('Error deleting expense');
	}
};

export default {
	listExpenses,
	getExpense,
	createExpense,
	updateExpense,
	deleteExpense,
};
