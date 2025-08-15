import { CookieOptions, Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from "uuid";
import moment from "moment";
import { CatchError, TryError } from "../utils/error";
import SchoolModel from "../models/school.model";
import { PayloadInterface, SessionInterface } from "../middleware/auth.middleware";
import { downloadObject } from "../utils/s3";

const accessTokenExpiry = "10m"
const accessTokenTimeInMs = 10*60*1000
const refreshTokenTimeInMs = 7*24*60*60*1000


type TokenType = "at" | "rt"

const getToken = async (payload: PayloadInterface) => {
    const accessToken = await jwt.sign(payload, process.env.AUTH_SECRET!, {expiresIn: accessTokenExpiry})
    const refreshToken = uuid()
    return {accessToken, refreshToken}
}

const getOptions = (tokenType: TokenType): CookieOptions => {
    return {
        maxAge: tokenType === "at" ? accessTokenTimeInMs : refreshTokenTimeInMs,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'none',
        httpOnly: true
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const {schoolName, directorName, email, mobile, password} = req.body
        if(!schoolName || !directorName || !email || !password || !mobile)
            throw TryError("All fields are required!", 400)

        const newuser = {schoolName, directorName, email, mobile, password}
        await SchoolModel.create(newuser)

        res.json({message: "Account created successfully!"})
    } catch (err) {
        CatchError(err, res, "Signup failed please try after some time")
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        if(!email || !password)
            throw TryError("Email and Password required", 400)

        const user = await SchoolModel.findOne({email})
        if(!user)
            throw TryError("User not found", 404)

        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword)
            throw TryError("Invalid credentials email or password incorrec")
        
        const payload = {
            id: user._id,
            image: user.image || null,
            schoolName: user.schoolName,
            directorName: user.directorName,
            email: user.email,
            mobile: user.mobile,
            tagline: user.tagline || null,
            estd: user.estd || null,
            regNo: user.regNo || null,
            address: user.address || null,
            city: user.city || null,
            state: user.state || null,
            country: user.country || null,
            pincode: user.pincode || null
        }

        const {accessToken, refreshToken} = await getToken(payload)

        await SchoolModel.updateOne({_id: user._id}, {$set: {
            refreshToken,
            expiry: moment().add(7, 'days').toDate()
        }})

        res.cookie("accessToken", accessToken, getOptions("at"))
        res.cookie("refreshToken", refreshToken, getOptions("rt"))

        res.json({message: "Login Success"})
    } catch (err) {
        CatchError(err, res, "Login failed please try after some time")
    }
}

export const getSession = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.accessToken

        if(!token)
            throw TryError("Invalid session", 400)

        const session = await jwt.verify(token, process.env.AUTH_SECRET!)
        res.send(session)

    } catch (err) {
        CatchError(err, res, "Invalid session")
    }
}

export const generateRefreshToken = async (req: SessionInterface, res: Response) => {
    try {
        if(!req.session)
            throw TryError("Failed to refresh token", 401)
        
        const {accessToken, refreshToken} = await getToken(req.session)
        await SchoolModel.updateOne({_id: req.session.id}, {$set: {refreshToken, expiry: moment().add(7, 'days').toDate()}})
        
        res.cookie("accessToken", accessToken, getOptions('at'))
        res.cookie("refreshToken", refreshToken, getOptions('rt'))
        res.json({message: "Token refreshed"})

    } catch (err) {
        CatchError(err, res, "Failed to refresh token")
    }
}

export const logout = async (_req: Request, res: Response) => {
    try {
        const options = {
        httpOnly: true,
        maxAge: 0,
        secure: false,
        domain: 'localhost'
        }

        res.clearCookie("accessToken", options)
        res.clearCookie("refreshToken", options)
        res.json({message: "Logout suceess"})
        
    } catch (err) {
        CatchError(err, res, "Failed to logout")
    }
}

export const updateSettings = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const user = await SchoolModel.findByIdAndUpdate(id, req.body, {new: true})

        if(!user)
            throw TryError("school id not found")

        const payload = {
            id: user._id,
            image: user.image || null,
            schoolName: user.schoolName,
            directorName: user.directorName,
            email: user.email,
            mobile: user.mobile,
            tagline: user.tagline || null,
            estd: user.estd || null,
            regNo: user.regNo || null,
            address: user.address || null,
            city: user.city || null,
            state: user.state || null,
            country: user.country || null,
            pincode: user.pincode || null
        }

        const {accessToken, refreshToken} = await getToken(payload)

        await SchoolModel.updateOne({_id: user._id}, {$set: {
            refreshToken,
            expiry: moment().add(7, 'days').toDate()
        }})

        res.cookie("accessToken", accessToken, getOptions("at"))
        res.cookie("refreshToken", refreshToken, getOptions("rt"))

        res.json({message: `${user.schoolName} updated successfully`})

    } catch (err) {
        CatchError(err, res, "Failed to update settings")
    }
}

export const getSignedUrl = async (req: Request, res: Response) => {
    try {
        if(!req.body.image)
            throw TryError("Image not found")

        const url = await downloadObject(req.body.image, 60)
        
        res.json(url)
    } catch (err) {
        CatchError(err, res, "failed to generate signed url")
    }
}