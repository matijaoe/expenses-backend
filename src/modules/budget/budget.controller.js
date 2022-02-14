import * as budgetMethods from './budget.method.js';

export const getBudget = async (req, res) => {
	console.log(createBudget);
	try {
		const budget = await budgetMethods.getBudget(req.user.id);
		res.status(200).send(budget);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

export const createBudget = async (req, res) => {
	console.log(createBudget);
	try {
		const budget = await budgetMethods.createBudget(req.body, req.user.id);
		res.status(201).send(budget);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};
export const updateBudget = async (req, res) => {
	try {
		const budget = await budgetMethods.updateBudget(req.body, req.user.id);
		res.status(200).send(budget);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};
