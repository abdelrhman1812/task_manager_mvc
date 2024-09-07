import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
// console.log('Mongo URI:', process.env.MONGO_URI);

import flash from 'connect-flash';
import mongoSession from 'connect-mongodb-session';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from "cors";
import dbConnections from './database/db.connections.js';
import authRouter from './src/models/auth/auth.routes.js';
import tasksRouter from './src/models/tasks/tasks.routes.js';
import AppError from './src/utils/appError.js';
import globalErrorHandler from './src/utils/globalError.js';
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dbConnections();

/* Global */

app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(cors());
app.set('views', path.join(__dirname, 'views'));

/* Session */
const MongoDBStore = mongoSession(session);

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessionStore',
});

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: store
}));

app.use(flash());

/* Routers */
app.use('/tasks', tasksRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.redirect('/tasks');
});

app.use('*', (req, res, next) => {
    next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
