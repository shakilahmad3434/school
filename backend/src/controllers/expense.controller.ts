import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import ExpenseModel from "../models/expense.model";

export const createExpense = async (req: Request, res: Response) => {
    try {
        await ExpenseModel.create(req.body)
        res.json({message: "New expense add successfully!"})
    } catch (err) {
        CatchError(err, res, "Failed to add new expense")
    }
}

export const fetchExpenses = async (req: Request, res: Response) => {
    try {
        const {schoolID, sessionID} = req.params

        const expense = await ExpenseModel.find({school: schoolID, session: sessionID}).sort({createdAt: -1})

        res.json(expense)
    } catch (err) {
        CatchError(err, res, "Failed to fetch all expenses")
    }
}

export const fetchExpenseById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const expense = await ExpenseModel.findById(id)

        if(!expense)
            throw TryError("Expense record not found")

        res.json(expense)
    } catch (err) {
        CatchError(err, res, "Failed to fetch expense record")
    }
}

export const updateExpense = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const expense = await ExpenseModel.findByIdAndUpdate(id, req.body)

        if(!expense)
            throw TryError("Expense not found")
        
        res.json({message: "expense updated successfully"})
    } catch (err) {
        CatchError(err, res, "Failed to update expense record")
    }
}

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const expense = await ExpenseModel.findByIdAndDelete(id)

        if(!expense)
            throw TryError("expense not found")
        
        res.json({message: `${expense.title} expense deleted successfully`})
    } catch (err) {
        CatchError(err, res, "Failed to delete expense")
    }
}