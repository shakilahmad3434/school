import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
mongoose.connect(process.env.DB!)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import SchoolRouter from './routes/school.route';
import StudentRouter from './routes/student.route';
import SubjectRouter from './routes/subject.route';
import TeacherRouter from './routes/teacher.route';
import ClassRouter from './routes/class.route';
import StorageRouter from './routes/storage.route';
import ExpenseRouter from './routes/expense.route';
import AuthMiddleware from './middleware/auth.middleware';
import SalaryRouter from './routes/salary.route';
import EmployeeRouter from './routes/employee.route';
import PaymentRouter from './routes/payment.route';
import DashboardRouter from './routes/dashboard.route';

const app = express();
app.listen(process.env.PORT || "0.0.0.0", () => console.log(`Server is running on port:${process.env.PORT}`));

app.use(cors({origin: process.env.CLIENT || "*", credentials: true}));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use('/auth', SchoolRouter);
app.use('/student', AuthMiddleware, StudentRouter);
app.use('/subject', AuthMiddleware, SubjectRouter);
app.use('/class', AuthMiddleware, ClassRouter);
app.use('/teacher', AuthMiddleware, TeacherRouter);
app.use('/storage', StorageRouter);
app.use('/expense', AuthMiddleware, ExpenseRouter);
app.use('/salary', AuthMiddleware, SalaryRouter);
app.use('/employee', AuthMiddleware, EmployeeRouter);
app.use('/payment', AuthMiddleware, PaymentRouter);
app.use('/dashboard', AuthMiddleware, DashboardRouter);