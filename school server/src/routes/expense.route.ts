import { Router } from "express";
import { createExpense, deleteExpense, fetchExpenseById, fetchExpenses, updateExpense } from "../controllers/expense.controller";
const ExpenseRouter = Router();

ExpenseRouter.post('/', createExpense);
ExpenseRouter.get('/:schoolID/:sessionID', fetchExpenses);
ExpenseRouter.get('/:id', fetchExpenseById);
ExpenseRouter.put('/:id', updateExpense);
ExpenseRouter.delete('/:id', deleteExpense);

export default ExpenseRouter;