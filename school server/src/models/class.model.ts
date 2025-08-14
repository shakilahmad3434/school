import moment from "moment";
import mongoose, { Schema, model } from "mongoose";
import shortid from "shortid";

const classSchema = new Schema({
    classId: {
        type: String,
        unique: true
    },
    class: {
        type: String,
        required: true,
        unique: [true, "class already exists!"]
    },
    sections: {
        type: [String],
        required: true,
        enum: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
       "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    },
    school: {
        type: mongoose.Types.ObjectId,
        ref: "School",
        required: true
    },
    session: {
        type: String,
    },
    fee: {
        type: Number,
        required: true
    },
    classTeacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
}, {timestamps: true})

classSchema.pre('save', function(next){
    if(!this.session){
        const currentYear = moment().format("YYYY")
        const nextYearShort = moment().add(1, 'years').format("YY")
        this.session = `${currentYear}-${nextYearShort}`
    }
    next()
})

classSchema.pre("save", function(next){
    if(!this.classId){
        this.classId = shortid();
    }
    next()
})

const ClassModel = model("Class", classSchema)
export default ClassModel