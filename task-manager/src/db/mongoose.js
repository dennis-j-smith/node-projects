const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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

const user = new User({
    name: '    Dennis',   
    email: "dennis@foo.com     ",
    password: "  password  foo"
    //age: -1
})

user.save().then(() => {
    console.log(user)
}).catch((error) => {
    console.log('Error! ',error)
})

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     complete: {
//         type: Boolean
//     }  
// })

// const t = new Task({
//     description: 'Knock out boots.',
//     complete: true
// })

// t.save().then(() => {
//     console.log(t)
// }).catch((error) => {
//     console.log('Error! ',error)
// })