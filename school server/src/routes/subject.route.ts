import { Router } from "express";
import { createSubject, deleteSubject, fetchSubjectById, fetchSubjects, updateSubject } from "../controllers/subject.controller";
const SubjectRouter = Router()

SubjectRouter.post('/', createSubject)
SubjectRouter.get('/:schoolID/:sessionID', fetchSubjects)
SubjectRouter.get('/:id', fetchSubjectById)
SubjectRouter.put('/:id', updateSubject)
SubjectRouter.delete('/:id', deleteSubject)

export default SubjectRouter