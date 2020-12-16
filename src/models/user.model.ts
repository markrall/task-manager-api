import { Schema, model, Model, Document } from "mongoose"
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
const Task = require('./task.model')

// Typing based on:
// https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc
// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

// could have used Typegoose instead for ineterface mappings
// https://typegoose.github.io/typegoose/

interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  tokens: Array<{ token: string }>,
  avatar: Buffer
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value: string) {
      if (!/^[a-z0-9.-\s]+$/i.test(value)) {
        throw new Error('Must be valid user name')
      }
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value: any) {
      const regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
      if (!regex.test(value)) {
        throw new Error('Must be a valid email address')
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value: any) {
      // https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
      const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
      if (!regex.test(value)) {
        throw new Error('Must be a valid password')
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  avatar: {
    type: Buffer,
  },
}, {
  timestamps: true,
})

UserSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
})

UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = sign({ _id: user._id.toString() }, <string>process.env.JWT)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

UserSchema.statics.findByCredentials = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to log in')
  }
  const isMatch = await compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to log in')
  }
  return user
}

// hash the plaintext password defore saving
// uses standard function as a second parameter to
// preserve 'this' equal to the document being saved
UserSchema.pre<IUser>('save', async function (next: () => void) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hash(user.password, 8)
  }
  next()
})

UserSchema.pre<IUser>('remove', async function (next: () => void) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

const User: Model<IUser> = model('User', UserSchema)

module.exports = User
