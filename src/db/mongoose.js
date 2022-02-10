import mongoose from 'mongoose';

await mongoose
	.connect(process.env.MONGODB_URL, { autoIndex: true })
	.catch((error) => console.log(error.message));

console.log('🐦 Mongoose up and running 🐤');
