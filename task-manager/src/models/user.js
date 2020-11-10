const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'thisismynewcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to log in');
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to log in');
    }

    return user
}

// Hash the plaintext passwed before saving.
userSchema.pre('save', async function(next) {
    console.log("middleware")

    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }    
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User