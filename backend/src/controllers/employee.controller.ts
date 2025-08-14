import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import EmployeeModel from "../models/employee.model";
import { downloadObject } from "../utils/s3";

export const createEmployee = async (req: Request, res: Response) => {
    try {
        await EmployeeModel.create(req.body)
        res.json({message: "New employee created successfully!"})
    } catch (err) {
        CatchError(err, res, "failed to create new employee")
    }
}

export const fetchEmployees = async (req: Request, res: Response) => {
    try {
        const {schoolID, sessionID} = req.params

        const employeeList = await EmployeeModel.find({school: schoolID, session: sessionID}).sort({createdAt: -1})

        const updatedEmployees = await Promise.all(
            employeeList.map(async (employee) => {
                const url = await downloadObject(employee.employeePhoto, 60)
                const employeeObj = employee.toObject()
                employeeObj.employeePhoto = url
                return employeeObj
            })
        )
        res.json(updatedEmployees)
    } catch (err) {
        CatchError(err, res, "failed to fetch all employees record")
    }
}

export const fetchEmployeeById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const employee = await EmployeeModel.findById(id)

        if(!employee)
            throw TryError("Employee not found", 404)

        res.json(employee)
    } catch (err) {
        CatchError(err, res, "Failed to fetch employee record")
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const employee = await EmployeeModel.findByIdAndUpdate(id, req.body, {new: true})

        if(!employee)
            throw TryError("Employee not found", 404)

        res.json(employee)
    } catch (err) {
        CatchError(err, res, "Failed to update employee record")
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const employee = await EmployeeModel.findByIdAndDelete(id)

        if(!employee)
            throw TryError("Employee not found")
        
        res.json({message: `${employee.employeeName} Employee deleted successfully`})
    } catch (err) {
        CatchError(err, res, "Failed to delete employee")
    }
}