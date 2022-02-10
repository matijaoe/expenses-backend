/* eslint-disable no-unreachable */
const getCurrentUser = (req, res) => {
	try {
		return true;
	} catch (err) {
		console.error(err.message);
	}
};
const updateCurrentUser = (req, res) => {
	try {
		return true;
	} catch (err) {
		console.error(err.message);
	}
};
const deleteCurrentUser = (req, res) => {
	try {
		return true;
	} catch (err) {
		console.error(err.message);
	}
};

export default {
	getCurrentUser,
	updateCurrentUser,
	deleteCurrentUser,
};
