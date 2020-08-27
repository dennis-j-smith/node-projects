const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value<0)
                throw Error("Age must be a positive number")
        }
    },
    password: {
        type: String,
        trim: true,
        validate(value) {
            if (value.length < 6)
                throw Error("Password must be at least 6 characters")
            if (value.includes("password")) {
                throw Error("Password cannot contain the string \"password\"")
            }
        }
    }
})

module.exports = User