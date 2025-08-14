import { NextFunction, Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import jwt, { JwtPayload } from "jsonwebtoken"
import mongoose from "mongoose";

export interface PayloadInterface {
    id: mongoose.Types.ObjectId;
    image: string | null;
    schoolName: string;
    directorName: string;
    email: string;
    mobile: string;
    tagline: string | null;
    estd: Date | null;
    regNo: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    pincode: number | null;
}

export interface SessionInterface extends Request {
    session?: PayloadInterface
}

export const AuthMiddleware = async (req: SessionInterface, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken

        if(!accessToken)
            throw TryError("Failed to authorized user", 401)

        const payload = await jwt.verify(accessToken, process.env.AUTH_SECRET!) as JwtPayload

        req.session = {
            id: payload.id || null,
            image: payload.image || null,
            schoolName: payload.schoolName,
            directorName: payload.directorName,
            email: payload.email,
            mobile: payload.mobile,
            tagline: payload.tagline || null,
            estd: payload.estd || null,
            regNo: payload.regNo || null,
            address: payload.address || null,
            city: payload.city || null,
            state: payload.state || null,
            country: payload.country || null,
            pincode: payload.pincode || null
        }

        next()
    } catch (err) {
        CatchError(err, res, "Failed to authorized user")
    }
}

export default AuthMiddleware