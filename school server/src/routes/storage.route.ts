import { Router } from "express";
import { downloadFile, uploadFile } from "../controllers/storage.controller";
import AuthMiddleware from "../middleware/auth.middleware";
const StorageRouter = Router()

StorageRouter.post("/download", AuthMiddleware, downloadFile)
StorageRouter.post("/upload", AuthMiddleware, uploadFile)

export default StorageRouter;