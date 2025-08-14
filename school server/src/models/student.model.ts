import moment from "moment";
import mongoose, { Schema, model } from "mongoose";
import shortid from "shortid";

const studentSchema = new Schema({
    studentPhoto: {
        type: String,
        required: true,
        trim: true,
    },
    studentId: {
        type: String,
        unique: true
    },
    studentName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    fatherName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    motherName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
    },
    dob: {
        type: Date,
        required: true,
    },
    religion:{
        type: String,
        required: true,
        enum: ["hindu", "muslim", "sikh", "christian", "jain", "other"],
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email Address"]
    },
    class: {
        type: String,
        required: true,
        trim: true
    },
    rollNumber: {
        type: Number,
        required: false
    },
    section: {
        type: String,
        required: true,
        enum: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
       "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        default: 'A'
    },
    address: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    pincode: {
        type: String,
        required: true,
        trim: true
    },
    previousSchool: {
        type: String,
        trim: true,
        required: false
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


studentSchema.pre("save", async function (next) {
    if (!this.session) {
        const currentYear = moment().format("YYYY");
        const nextYearShort = moment().add(1, "years").format("YY");
        this.session = `${currentYear}-${nextYearShort}`;
    }

    if (!this.studentId) {
        this.studentId = shortid();
    }

    if (!this.rollNumber) {
        const lastStudent = await model('Student').findOne({
            class: this.class,
            section: this.section,
            school: this.school,
            session: this.session,
        })
        .sort({ rollNumber: -1 })
        .select('rollNumber');

        this.rollNumber = lastStudent?.rollNumber ? lastStudent.rollNumber + 1 : 1;
    }

    next();
});


const StudentModel = model('Student', studentSchema)
export default StudentModel