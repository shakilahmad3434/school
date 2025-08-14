import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const schoolSchema = new Schema({
    image: {
        type: String,
        required: false
    },
    directorName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    schoolName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: [true, "School name must be unique"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Email address already exists"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email Address"]
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Mobile number already exists"]
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tagline: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
    },
    website: {
        type: String,
        required: false,
        trim: true,
        lowercase: true
    },
    estd: {
        type: Date,
        required: false,
    },
    regNo: {
        type: String,
        required: false,
        trim: true
    },
    address: {
        type: String,
        required: false,
        trim: true,
    },
    city: {
        type: String,
        required: false,
        trim: true,
    },
    state: {
        type: String,
        required: false,
        trim: true,
    },
    country: {
        type: String,
        required: false,
        trim: true,
    },
    pincode: {
        type: Number,
        required: false,
        trim: true,
    },
    refreshToken: {
        type: String
    },
    expiry: {
        type: Date
    }
}, {timestamps: true});

schoolSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

schoolSchema.pre("save", function(next){
    this.refreshToken = null;
    this.expiry = null;
    next();
})

const SchoolModel = model("School", schoolSchema);
export default SchoolModel;