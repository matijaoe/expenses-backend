import mongoose from 'mongoose';

const { Schema } = mongoose;

const expenseSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Name not provided.'],
			maxLength: [40, 'Name too long.'],
			trim: true,
		},
		description: {
			type: String,
			maxLength: [255, 'Description too long.'],
			trim: true,
		},
		amount: {
			type: Number,
			required: [true, 'Price amount not provided.'],
		},
		currency: {
			type: String,
			required: [true, 'Currency not provided.'],
			enum: ['USD', 'EUR', 'GBP', 'BTC'],
			default: 'USD',
		},
		date: {
			type: Date,
			required: [true, 'Date not provided.'],
		},
		owner: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		category: {
			type: Schema.Types.ObjectId,
			required: [true, 'Category not provided.'],
			ref: 'ExpenseCategory',
		},
	},
	{
		timestamps: true,
	}
);

const Expense = new mongoose.model('Expense', expenseSchema);

export default Expense;
