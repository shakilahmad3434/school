import { Router } from "express";
import { generateRefreshToken, getSession, getSignedUrl, login, logout, signup, updateSettings } from "../controllers/school.controller";
import AuthMiddleware from "../middleware/auth.middleware";
const SchoolRouter = Router()

/**
 * @swagger
 * /auth/signup:
 *  post:
 *      tags:
 *          - schools
 *      summary: Create a new School
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email: 
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          201:
 *              description: User created successfully
 *          500:
 *              description: Internal server error
 */
SchoolRouter.post('/signup', signup);
SchoolRouter.post('/login', login);
SchoolRouter.post('/settings/:id', AuthMiddleware, updateSettings);
SchoolRouter.get('/session', getSession);
SchoolRouter.post('/image-url', getSignedUrl);
SchoolRouter.get('/refresh-token', AuthMiddleware, generateRefreshToken);
SchoolRouter.get('/logout', logout);
export default SchoolRouter