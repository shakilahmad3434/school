import moment from "moment";
import mongoose, { Schema, model } from "mongoose";
import shortid from "shortid";

const teacherSchema = new Schema(
    {
        teacherPhoto: {
            type: String,
            required: true,
            trim: true,
        },
        teacherId: {
            type: String,
            unique: true
        },
        teacherName: {
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
            enum: ["muslim", "hindu", "christian", "jain", "sikh", "other"],
            required: true,
        },
        subjects: {
            type: [String],
            required: true,
        },
        qualification: {
            type: String,
            required: true,
            trim: true,
        },
        joiningDate: {
            type: Date,
            default: Date.now,
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
        previousSchool: {
            type: String,
            required: false,
            trim: true,
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

teacherSchema.pre("save", function (next) {
    if(!this.session){
        const currentYear = moment().format("YYYY");
        const nextYearShort = moment().add(1, "years").format("YY");
        this.session = `${currentYear}-${nextYearShort}`;
    }
    next();
});

teacherSchema.pre("save", function(next){
    if(!this.teacherId){
        this.teacherId = shortid();
    }
    next()
})

const TeacherModel = model("Teacher", teacherSchema);
export default TeacherModel;
