"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const account_1 = require("../emails/account");
const User = require('../models/user.model');
exports.createUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User(req.body);
        account_1.sendWelcomeEmail(user.email, user.name);
        yield user.save();
        const token = yield user.generateAuthToken();
        res.status(201).send({ user, token });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.loginUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User.findByCredentials(email, password);
        const token = yield user.generateAuthToken();
        res.send({ user, token });
    }
    catch (error) {
        res.status(400).send();
    }
});
exports.logoutUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        yield req.user.save();
        res.send();
    }
    catch (error) {
        res.status(500).send();
    }
});
exports.logoutAllUsers = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        req.user.tokens = [];
        yield req.user.save();
        res.send();
    }
    catch (error) {
        res.status(500).send();
    }
});
exports.findUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    res.send(req.user);
});
exports.updateUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const updatable = ['name', 'email', 'password'];
    const isValidUpdate = updates.every(update => updatable.includes(update));
    if (!isValidUpdate)
        return res.status(400).send({ error: 'Invalid update' });
    try {
        const user = req.user;
        updates.forEach(update => (user[update] = req.body[update]));
        yield user.save();
        res.send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.deleteUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        account_1.sendCancellationEmail(req.user.email, req.user.name);
        yield req.user.remove();
        res.send(req.user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.uploadAvatar = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const buffer = yield sharp_1.default(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
    req.user.avatar = buffer;
    yield req.user.save();
    res.send();
});
exports.findUserAvatar = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        if (!user || !user.avatar)
            throw new Error();
        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    }
    catch (e) {
        res.status(404).send();
    }
});
exports.deleteAvatar = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        req.user.avatar = undefined;
        yield req.user.save();
        res.send();
    }
    catch (error) {
        res.status(500).send();
    }
});
//# sourceMappingURL=user.controller.js.map