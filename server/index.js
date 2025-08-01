import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDatabase from './db.js';

import userRouter from './router/userRoutes.js';
import authRouter from './router/authRoutes.js';
import listingRouter from './router/listingRoutes.js';

dotenv.config();

connectToDatabase();

const app = express();

app.use(express.json());

app.use(cookieParser());

const port = process.env.PORT || 5174;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});