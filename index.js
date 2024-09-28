import express from 'express';
import cookieParser from 'cookie-parser';

import userRouter from './routes/userRoute.js';
import reportRouter from './routes/reportRoute.js';
import { auth } from './middlewares/authMiddleware.js';

// initializing express app
const app = express();
const port = 3000;
// body parser - to parse the req body and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// to parse cookies
app.use(cookieParser());

// application routes
app.use('/user', userRouter);
app.use('/report', auth, reportRouter);

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});