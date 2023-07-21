import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js'
import userRoute from './routes/userRoutes.js'

const PORT = process.env.PORT || 5000;
const app = express();



connectDB()

//Middleware


app.use(cors({credentials: true,
             origin: process.env.CLIENT_HOST}))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());


//Routes
app.use("/api/users", userRoute) 

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => { console.log(`listening on ${PORT}`); });
