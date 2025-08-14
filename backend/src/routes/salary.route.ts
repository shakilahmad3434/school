import { Router } from "express";
import { createSalary, deleteSalary, fetchSalaries, fetchSalaryById, updateSalary } from "../controllers/salary.controller";
const SalaryRouter = Router();

SalaryRouter.post('/', createSalary);
SalaryRouter.get('/:schoolID/:sessionID', fetchSalaries);
SalaryRouter.get('/:id', fetchSalaryById);
SalaryRouter.put('/:id', updateSalary);
SalaryRouter.delete('/:id', deleteSalary);

export default SalaryRouter;