import { Router } from "express";
import { createTeacher, deleteTeacher, fetchTeacher, fetchTeacherById, updateTeacher } from "../controllers/teacher.controller";

const TeacherRouter = Router()

TeacherRouter.post('/', createTeacher)
TeacherRouter.get('/:schoolID/:sessionID', fetchTeacher)
TeacherRouter.get('/:id', fetchTeacherById)
TeacherRouter.put('/:id', updateTeacher)
TeacherRouter.delete('/:id', deleteTeacher)

export default TeacherRouter