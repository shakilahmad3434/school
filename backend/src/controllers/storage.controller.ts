import { Request, Response } from "express"
import { CatchError, TryError } from "../utils/error"
import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

interface OptionInterface {
    Bucket: string;
    Key: string;
}

const conn = new S3Client({
    region: process.env.AWS_REGION,
    endpoint: `https://s3-${process.env.AWS_REGION}.amazonaws.com`,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

const isFileExist = async (option: OptionInterface) => {
    try {
        const command = new HeadObjectCommand(option)
        await conn.send(command)
        return true
    } catch (error) {
        return false
    }
}

export const downloadFile = async (req: Request, res: Response) => {
    try {
        const {path} = req.body

        if(!path)
            throw TryError("Path is missing", 400)

        const option = {
            Bucket: process.env.S3_BUCKET!,
            Key: path
        }

        const fileExist = await isFileExist(option)
        if(!fileExist)
            throw TryError("path is wrong. please check your file name", 404)

        const command = new GetObjectCommand(option)

        const url = await getSignedUrl(conn, command, {expiresIn: 60})

        res.json({url})
    } catch (err) {
        CatchError(err, res, "Failed to generate download file")
    }
}

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const {path, type} = req.body

        if(!path || !type)
            throw TryError("path or type are required", 400)

        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/avif']
        if(!allowedTypes.includes(type))
            throw TryError("Unsupported file type", 400)

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: path,
            ContentType: type
        })

        const url = await getSignedUrl(conn, command, {expiresIn: 60})
        res.json({url})

    } catch (err) {
        CatchError(err, res, "Failed to upload file")
    }
}