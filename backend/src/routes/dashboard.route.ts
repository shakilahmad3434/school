import { Router } from "express";
import { dashboard } from "../controllers/dashboard.controller";
const DashboardRouter = Router()

DashboardRouter.get('/:schoolID/:sessionID', dashboard);


export default DashboardRouter