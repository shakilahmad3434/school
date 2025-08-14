import { Router } from "express";
import { createPayment, deletePayment, fetchPaymentById, fetchPayments, updatePayment } from "../controllers/payment.controller";

const PaymentRouter = Router();

PaymentRouter.post('/', createPayment);
PaymentRouter.get('/:schoolID/:sessionID', fetchPayments);
PaymentRouter.get('/:id', fetchPaymentById);
PaymentRouter.put('/:id', updatePayment);
PaymentRouter.delete('/:id', deletePayment);

export default PaymentRouter;