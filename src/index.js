import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes.js';

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(morgan('dev'));

// mount all routes on /api path
app.use('/api', routes);

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
