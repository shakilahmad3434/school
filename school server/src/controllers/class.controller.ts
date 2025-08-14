import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import ClassModel from "../models/class.model";

export const createClass = async (req: Request, res: Response) => {
    try {
        const classInfo = await ClassModel.create(req.body)
        res.json({message: `${classInfo.class} class created successfully!`})
    } catch (err) {
        CatchError(err, res, "Failed to create new class")
    }
}

export const fetchClass = async (req: Request, res: Response) => {
    try {
        const {schoolID, sessionID} = req.params

        const classInfo = await ClassModel.find({school: schoolID, session: sessionID}).populate("classTeacher", "teacherName").sort({createdAt: -1})

        res.json(classInfo)
    } catch (err) {
        CatchError(err, res, "Failed to fetch all class")
    }
}

export const fetchclassById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const classInfo = await ClassModel.findById(id)

        if(!classInfo)
            throw TryError("class not found")

        res.json(classInfo)
    } catch (err) {
        CatchError(err, res, "Failed to fetch class")
    }
}

export const updateclass = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const classInfo = await ClassModel.findByIdAndUpdate(id, req.body)

        if(!classInfo)
            throw TryError("class not found")
        
        res.json({message: `${classInfo.class} class updated successfully`})
    } catch (err) {
        CatchError(err, res, "Failed to update class record")
    }
}

export const deleteclass = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const classInfo = await ClassModel.findByIdAndDelete(id)

        if(!classInfo)
            throw TryError("class not found")
        
        res.json({message: `${classInfo.class} class deleted successfully`})
    } catch (err) {
        CatchError(err, res, "Failed to delete class")
    }
}