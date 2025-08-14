import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import SubjectModel from "../models/subject.model";

export const createSubject = async (req: Request, res: Response) => {
    try {
        await SubjectModel.create(req.body)

        res.json({message: "New subject created successfully!"})

    } catch (err) {
        CatchError(err, res, "Failed to create new subject")
    }
}

export const fetchSubjects = async (req: Request, res: Response) => {
    try {
        const {schoolID, sessionID} = req.params
        const subject = await SubjectModel.find({school: schoolID, session: sessionID}).sort({createdAt: -1})
        res.json(subject)
    } catch (err) {
        CatchError(err, res, "Failed to fetch all subject")
    }
}

export const fetchSubjectById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const subject = await SubjectModel.findById(id)

        if(!subject)
            throw TryError("Subject not found")

        res.json(subject)
    } catch (err) {
        CatchError(err, res, "Failed to fetch subject")
    }
}

export const updateSubject = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const subject = await SubjectModel.findByIdAndUpdate(id, req.body)

        if(!subject)
            throw TryError("Subject not found")
        
        res.json({message: "Subject updated successfully"})
    } catch (err) {
        CatchError(err, res, "Failed to update subject record")
    }
}

export const deleteSubject = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const subject = await SubjectModel.findByIdAndDelete(id)

        if(!subject)
            throw TryError("Subject not found")
        
        res.json({message: `${subject.subject} Subject deleted successfully`})
    } catch (err) {
        CatchError(err, res, "Failed to delete subject")
    }
}