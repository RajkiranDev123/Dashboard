import mongoose from "mongoose";
import validator from "validator"

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("Not a valid email")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    profile: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    dateCreated: Date,
    // { type: Date, default: Date.now() }
})
////////////model name
export const users = new mongoose.model("users", usersSchema)
//////////////////////////////////////// collection name
