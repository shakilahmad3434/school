import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import PaymentModel from "../models/payment.model";

export const createPayment = async (req: Request, res: Response) => {
    try {
        await PaymentModel.create(req.body)
        res.json({message: "New payment add successfully!"})
    } catch (err) {
        CatchError(err, res, "Failed to add new payment record")
    }
}

export const fetchPayments = async (req: Request, res: Response) => {
    try {
        const {schoolID, sessionID} = req.params

        const payment = await PaymentModel.find({school: schoolID, session: sessionID}).sort({createdAt: -1})

        res.json(payment)
    } catch (err) {
        CatchError(err, res, "Failed to fetch all payments record")
    }
}

export const fetchPaymentById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const payment = await PaymentModel.findById(id)

        if(!payment)
            throw TryError("Payment record not found")

        res.json(payment)
    } catch (err) {
        CatchError(err, res, "Failed to fetch payment record")
    }
}

export const updatePayment = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const payment = await PaymentModel.findByIdAndUpdate(id, req.body)

        if(!payment)
            throw TryError("Payment record not found")
        
        res.json({message: "Payment updated successfully"})
    } catch (err) {
        CatchError(err, res, "Failed to update payment record")
    }
}

export const deletePayment = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const payment = await PaymentModel.findByIdAndDelete(id)

        if(!payment)
            throw TryError("expense not found")
        
        res.json({message: `Payment deleted successfully`})
    } catch (err) {
        CatchError(err, res, "Failed to delete payment record")
    }
}