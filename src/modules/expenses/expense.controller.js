import * as expenseMethods from './expense.method.js';

export const getExpenses = async (req, res) => {
	try {
		const expenses = await expenseMethods.listExpenses(req.user._id);
		res.status(200).send(expenses);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const getExpense = async (req, res) => {
	const { id } = req.params;
	try {
		const expense = await expenseMethods.getExpense(id, req.user._id);

		if (!expense) {
			return res.status(404).send({ error: 'Expense not found.' });
		}

		res.status(200).send(expense);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const createExpense = async (req, res) => {
	try {
		const expense = await expenseMethods.createExpense(req.body, req.user.id);
		res.status(201).send(expense);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const updateExpense = async (req, res) => {
	const { id } = req.params;
	try {
		const updates = Object.keys(req.body);

		if (!isValidUpdate(updates)) {
			return res.status(400).send({ error: 'Invalid updates.' });
		}

		const expense = await expenseMethods.updateExpense(
			id,
			req.body,
			req.user._id
		);
		res.status(202).send(expense);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const deleteExpense = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedCategory = await expenseMethods.deleteExpense(
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

const isValidUpdate = (updates) => {
	const allowedUpdates = [
		'title',
		'description',
		'amount',
		'currency',
		'date',
		'category',
	];
	return updates.every((val) => allowedUpdates.includes(val));
};
