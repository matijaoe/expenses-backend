import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes.js';

import './db/mongoose.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(cors())
	.use(helmet())
	.use(morgan('dev'));

app.use('/api', routes);

app.listen(PORT, () => console.log(`🚀️ Running on port ${PORT}`));
