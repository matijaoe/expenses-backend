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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/', async (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => console.log(`🚀️ Running on port ${PORT}`));
