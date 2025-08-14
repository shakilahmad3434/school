import moment from "moment";
import mongoose, { Schema, model } from "mongoose";
import shortid from "shortid";

const employeeSchema = new Schema(
    {
        employeePhoto: {
            type: String,
            required: true,
            trim: true,
        },
        employeeId: {
            type: String,
        },
        employeeName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Invalid Email Address",
            ],
        },
        mobile: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },
        religion: {
            type: String,
            enum: ["muslim", "hindu", "sikh", "christian", "jain", "other"],
            required: true,
        },
        qualification: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        pincode: {
            type: String,
            required: true,
            trim: true,
        },
        designation: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        school: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        session: {
            type: String,
        },
    },
    { timestamps: true }
);

employeeSchema.pre("save", function (next) {
    if (!this.session) {
        const currentYear = moment().format("YYYY");
        const nextYearShort = moment().add(1, "years").format("YY");
        this.session = `${currentYear}-${nextYearShort}`;
    }
    next();
});

employeeSchema.pre("save", function (next) {
    if (!this.employeeId) {
        this.employeeId = shortid();
    }
    next();
});

const EmployeeModel = model("Employee", employeeSchema);

export default EmployeeModel;
