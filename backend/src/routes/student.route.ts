import { Router } from "express";
import { createStudent, deleteStudent, fetchStudent, fetchStudentById, updateStudent } from "../controllers/student.controller";
const StudentRouter = Router()

StudentRouter.post('/', createStudent)
StudentRouter.get('/:schoolID/:sessionID', fetchStudent)
StudentRouter.get('/:id', fetchStudentById)
StudentRouter.put('/:id', updateStudent)
StudentRouter.delete('/:id', deleteStudent)
export default StudentRouter