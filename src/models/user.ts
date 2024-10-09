import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name: { type: String, required: [true, 'User Full Name is required'] },
    email: {
        type: String,
        required: [true, 'User Email is required.'],
        unique: [true, 'User Email must be unique.'],
        trim: [true],
        lowecase: [true],
    },
    password: {
        type: String,
        required: [true, 'User Password is required.'],
        min: [4, 'Waty too short'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
        default: 'user',
    },
})

userSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})

const User = model('user', userSchema)

export default User
