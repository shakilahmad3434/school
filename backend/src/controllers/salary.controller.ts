import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import SalaryModel from "../models/salary.model";

export const createSalary = async (req: Request, res: Response) => {
    try {
        await SalaryModel.create(req.body)
        res.json({message: "Salary add successfully!"})
    } catch (err) {
        CatchError(err, res, "Failed to add new Salary")
    }
}

export const fetchSalaries = async (req: Request, res: Response) => {
    try {
        const {schoolID, sessionID} = req.params

        const salary = await SalaryModel.find({school: schoolID, session: sessionID}).sort({createdAt: -1})

        res.json(salary)
    } catch (err) {
        CatchError(err, res, "Failed to fetch all salary")
    }
}

export const fetchSalaryById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const salary = await SalaryModel.findById(id)

        if(!salary)
            throw TryError("salary not found")

        res.json(salary)
    } catch (err) {
        CatchError(err, res, "Failed to fetch salary")
    }
}

export const updateSalary = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const salary = await SalaryModel.findByIdAndUpdate(id, req.body)

        if(!salary)
            throw TryError("salary not found")
        
        res.json({message: "salary updated successfully"})
    } catch (err) {
        CatchError(err, res, "Failed to update salary record")
    }
}

export const deleteSalary = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const salary = await SalaryModel.findByIdAndDelete(id)

        if(!salary)
            throw TryError("salary not found")
        
        res.json({message: `Salary deleted successfully`})
    } catch (err) {
        CatchError(err, res, "Failed to delete salary")
    }
}