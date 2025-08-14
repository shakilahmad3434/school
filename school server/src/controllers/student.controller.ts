import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import StudentModel from "../models/student.model";
import { downloadObject } from "../utils/s3";

export const createStudent = async (req: Request, res: Response) => {
    try {
        const student = await StudentModel.create(req.body);
        res.json({ message: `${student.studentName} Student created successfully` });
    } catch (err) {
        CatchError(err, res, "Failed to new admission, please try after some time");
    }
};


export const fetchStudent = async (req: Request, res: Response) => {
    try {
        const {schoolID, sessionID} = req.params
        const studentList = await StudentModel.find({school: schoolID, session: sessionID}).sort({createdAt: -1})

        const updatedStudents = await Promise.all(
            studentList.map(async (student) => {
                const url = await downloadObject(student.studentPhoto, 60);
                const studentObj = student.toObject();
                studentObj.studentPhoto = url
                return studentObj
            })
        )
        res.json(updatedStudents)
    } catch (err) {
        CatchError(err, res, "Failed to fetch all student")
    }
}

export const fetchStudentById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const student = await StudentModel.findById(id)

        if(!student)
            throw TryError("Student not found", 404)

        res.json(student)
    } catch (err) {
        CatchError(err, res, "Failed to fetch student record")
    }
}

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const student = await StudentModel.findByIdAndUpdate(id, req.body, {new: true})

        if(!student)
            throw TryError("Student not found", 404)

        res.json(student)
    } catch (err) {
        CatchError(err, res, "Failed to update student record")
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const student = await StudentModel.findByIdAndDelete(id)
        
        if(!student)
            throw TryError("Student not found", 404)
        
        res.json({message: `${student.studentName} Student deleted successfully`})
    } catch (err) {
        CatchError(err, res, "Failed to delete student record")
    }
}