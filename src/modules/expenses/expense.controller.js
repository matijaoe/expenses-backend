import expenseMethods from './expense.method.js';

const getExpenses = async (req, res) => {
	try {
		const expenses = await expenseMethods.listExpenses(req.user._id);
		res.status(200).send(expenses);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const getExpense = async (req, res) => {
	console.log('getExpense');
	const { id } = req.params;
	try {
		const expense = await expenseMethods.getExpense(id, req.user._id);
		console.log(expense);

		if (!expense) {
			return res.status(404).send({ error: 'Expense not found.' });
		}

		res.status(200).send(expense);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const createExpense = async (req, res) => {
	try {
		const expense = await expenseMethods.createExpense(req.user.id, req.body);
		res.status(201).send(expense);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const deleteExpense = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedExpense = await expenseMethods.deleteExpense(id, req.user._id);
		if (!deletedExpense) {
			return res.status(404).send({ error: 'Expense not found.' });
		}

		return res.status(200).send(deletedExpense);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export default {
	getExpenses,
	getExpense,
	createExpense,
	// updateExpense,
	deleteExpense,
};
