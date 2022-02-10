import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Name not provided.'],
			minLength: [2, 'Name too short.'],
			maxLength: [24, 'Name too long.'],
			trim: true,
			lowercase: true,
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Email not provided.'],
			trim: true,
			lowercase: true,
			validate: [validator.isEmail, 'Email not valid.'],
		},
		password: {
			type: String,
			required: [true, 'Password not provided.'],
			trim: true,
			minLength: [5, 'Password must be at least 6 characters.'],
		},
		role: {
			type: String,
			required: [true, 'Role not provided.'],
			enum: ['user', 'admin'],
			default: 'user',
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

	user.tokens.push({ token });
	user.save();

	return token;
};

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login.');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login.');
	}

	return user;
};

// Hash the plain text password
userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

// TODO
// Delete user tasks when user is removed
// userSchema.pre('remove', async function (next) {
// 	const user = this;
// 	// await Task.deleteMany({ owner: user._id });
// 	next();
// });

const User = new mongoose.model('User', userSchema);

export default User;
