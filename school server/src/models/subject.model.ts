import moment from "moment";
import mongoose, { Schema, model } from "mongoose";
import shortid from "shortid"

const subjectSchema = new Schema({
    subjectId: {
        type: String,
        unique: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    fullmarks: {
        type: Number,
        required: true,
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

subjectSchema.pre("save", function (next) {
    if(!this.session){
        const currentYear = moment().format("YYYY");
        const nextYearShort = moment().add(1, "years").format("YY");
        this.session = `${currentYear}-${nextYearShort}`;
    }
    next();
});

subjectSchema.pre("save", function(next){
    if(!this.subjectId) {
        this.subjectId = shortid();
    }
    next()
})

const SubjectModel = model("Subject", subjectSchema)
export default SubjectModel