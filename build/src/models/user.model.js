"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const Task = require('./task.model');
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!/^[a-z0-9.-\s]+$/i.test(value)) {
                throw new Error('Must be valid user name');
            }
        },
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            const regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
            if (!regex.test(value)) {
                throw new Error('Must be a valid email address');
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            // https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            if (!regex.test(value)) {
                throw new Error('Must be a valid password');
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
});
UserSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
});
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
};
UserSchema.methods.generateAuthToken = function () {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = jsonwebtoken_1.sign({ _id: user._id.toString() }, process.env.JWT);
        user.tokens = user.tokens.concat({ token });
        yield user.save();
        return token;
    });
};
UserSchema.statics.findByCredentials = (email, password) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email });
    if (!user) {
        throw new Error('Unable to log in');
    }
    const isMatch = yield bcryptjs_1.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to log in');
    }
    return user;
});
// hash the plaintext password defore saving
// uses standard function as a second parameter to
// preserve 'this' equal to the document being saved
UserSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield bcryptjs_1.hash(user.password, 8);
        }
        next();
    });
});
UserSchema.pre('remove', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = this;
        yield Task.deleteMany({ owner: user._id });
        next();
    });
});
const User = mongoose_1.model('User', UserSchema);
module.exports = User;
//# sourceMappingURL=user.model.js.map