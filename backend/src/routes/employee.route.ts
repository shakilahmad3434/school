import { Router } from "express";
import { createEmployee, deleteEmployee, fetchEmployeeById, fetchEmployees, updateEmployee } from "../controllers/employee.controller";
const EmployeeRouter = Router()

EmployeeRouter.post('/', createEmployee);
EmployeeRouter.get('/:schoolID/:sessionID', fetchEmployees);
EmployeeRouter.get('/:id', fetchEmployeeById);
EmployeeRouter.put('/:id', updateEmployee);
EmployeeRouter.delete('/:id', deleteEmployee);

export default EmployeeRouter