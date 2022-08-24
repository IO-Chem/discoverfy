import express, { json, urlencoded, static as statik } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from '../routes/index';
import authRouter from '../routes/auth';

var app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(statik(join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

export default app;
