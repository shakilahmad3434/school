import { Router } from "express";
import { createClass, deleteclass, fetchClass, fetchclassById, updateclass } from "../controllers/class.controller";

const ClassRouter = Router()

ClassRouter.post('/', createClass)
ClassRouter.get('/:schoolID/:sessionID', fetchClass)
ClassRouter.get('/:id', fetchclassById)
ClassRouter.put('/:id', updateclass)
ClassRouter.delete('/:id', deleteclass)

export default ClassRouter