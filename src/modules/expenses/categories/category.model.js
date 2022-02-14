import mongoose from 'mongoose';

const { Schema } = mongoose;

const expenseCategorySchema = new Schema({
	name: {
		unique: false,
		type: String,
		required: [true, 'Name not provided.'],
		maxLength: [24, 'Name too long.'],
		trim: true,
		lowercase: true,
	},
	owner: {
		required: false,
		type: Schema.Types.ObjectId,
		default: null,
		ref: 'User',
	},
});

const ExpenseCategory = new mongoose.model(
	'ExpenseCategory',
	expenseCategorySchema
);

export default ExpenseCategory;
