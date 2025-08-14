import moment from 'moment';
import mongoose, { Schema, model } from 'mongoose'
import shortid from 'shortid'

const salarySchema = new Schema({
    salaryId: {
        type: String,
        unique: true
    },
    employee: {
        type: mongoose.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
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

salarySchema.pre("save", function (next) {
    if(!this.session){
        const currentYear = moment().format("YYYY");
        const nextYearShort = moment().add(1, "years").format("YY");
        this.session = `${currentYear}-${nextYearShort}`;
    }
    next();
});

salarySchema.pre("save", function(next) {
    if(!this.salaryId){
        this.salaryId = shortid()
    }
    next()
})

const SalaryModel = model("Salary", salarySchema)
export default SalaryModel