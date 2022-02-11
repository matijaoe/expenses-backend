import mongoose from 'mongoose';

const { Schema } = mongoose;

const expenseCategorySchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name not provided.'],
		maxLength: [24, 'Name too long.'],
		trim: true,
		lowercase: true,
	},
	owner: {
		// if it's null, it's global (only admin can add)
		type: Schema.Types.ObjectId | null,
		default: null,
	},
});

const ExpenseCategory = new mongoose.model(
	'ExpenseCategory',
	expenseCategorySchema
);

export default ExpenseCategory;
