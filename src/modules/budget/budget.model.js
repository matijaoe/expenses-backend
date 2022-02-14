import mongoose from 'mongoose';

const { Schema } = mongoose;

const budgetSchema = new Schema({
	amount: {
		type: Number,
		required: [true, 'Budget not provided.'],
	},
	owner: {
		required: true,
		unique: true,
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Budget = new mongoose.model('Budget', budgetSchema);

export default Budget;
