import moment from 'moment';
import mongoose, { Schema, model } from 'mongoose'
import shortid from 'shortid'

const paymentSchema = new Schema({
    paymentId: {
        type: String,
        unique: true
    },
    studentName: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    feeType: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["paid", 'due', 'pending'],
        default: "pending"
    },
    school: {
        type: mongoose.Types.ObjectId,
        ref: "School",
        required: true
    },
    session: {
        type: String,
    },
}, {timestamps: true})

paymentSchema.pre("save", function (next) {
    if(!this.session){
        const currentYear = moment().format("YYYY");
        const nextYearShort = moment().add(1, "years").format("YY");
        this.session = `${currentYear}-${nextYearShort}`;
    }
    next();
});

paymentSchema.pre("save", function(next) {
    if(!this.paymentId){
        this.paymentId = shortid()
    }
    next()
})

const PaymentModel = model("Payment", paymentSchema)
export default PaymentModel