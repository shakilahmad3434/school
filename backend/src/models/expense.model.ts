import moment from 'moment';
import mongoose, { Schema, model } from 'mongoose'
import shortid from 'shortid'

const expenseSchema = new Schema({
    expenseId: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
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

expenseSchema.pre("save", function (next) {
    if(!this.session){
        const currentYear = moment().format("YYYY");
        const nextYearShort = moment().add(1, "years").format("YY");
        this.session = `${currentYear}-${nextYearShort}`;
    }
    next();
});

expenseSchema.pre("save", function(next) {
    if(!this.expenseId){
        this.expenseId = shortid()
    }
    next()
})

const ExpenseModel = model("Expense", expenseSchema)
export default ExpenseModel