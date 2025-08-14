import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import TeacherModel from "../models/teacher.model";
import { downloadObject } from "../utils/s3";


export const createTeacher = async (req: Request, res: Response) => {
    try {
        await TeacherModel.create(req.body)
        res.json({message: "New teacher created successfully!"})
    } catch (err) {
        CatchError(err, res, "Failed to create new teacher")
    }
}

export const fetchTeacher = async (req: Request, res: Response) => {
    try {
        const {schoolID, sessionID} = req.params

        const teacherList = await TeacherModel.find({school: schoolID, session: sessionID}).sort({createdAt: -1})
        const updatedTeachers = await Promise.all(
            teacherList.map(async (teacher) => {
                const url = await downloadObject(teacher.teacherPhoto, 60)
                const teacherObj = teacher.toObject()
                teacherObj.teacherPhoto = url
                return teacherObj
            })
        )
        res.json(updatedTeachers)
    } catch (err) {
        CatchError(err, res, "Failed to fetch all teacher")
    }
}

export const fetchTeacherById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const teacher = await TeacherModel.findById(id)

        if(!teacher)
            throw TryError("Teacher not found")

        res.json(teacher)
    } catch (err) {
        CatchError(err, res, "Failed to fetch Teacher")
    }
}

export const updateTeacher = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const teacher = await TeacherModel.findByIdAndUpdate(id, req.body, {new: true})

        if(!teacher)
            throw TryError("Teacher not found")
        
        res.json({message: `${teacher.teacherName} Teacher updated successfully`})
    } catch (err) {
        CatchError(err, res, "Failed to update teacher record")
    }
}

export const deleteTeacher = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const teacher = await TeacherModel.findByIdAndDelete(id)

        if(!teacher)
            throw TryError("Teacher not found")
        
        res.json({message: `${teacher.teacherName} Teacher deleted successfully`})
    } catch (err) {
        CatchError(err, res, "Failed to delete teacher")
    }
}