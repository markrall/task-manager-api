"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const controller = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const router = express_1.default.Router();
const multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(_req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload image files of <1MB in JPG, JPEG or PNG format'), undefined);
        }
        cb(undefined, true);
    },
});
router.post('/users', controller.createUser);
router.post('/users/login', controller.loginUser);
router.post('/users/logout', auth, controller.logoutUser);
router.post('/users/logoutAllUsers', auth, controller.logoutAllUsers);
router.get('/users/me', auth, controller.findUser);
router.patch('/users/me', auth, controller.updateUser);
router.delete('/users/me', auth, controller.deleteUser);
router.post('/users/me/avatar', auth, upload.single('avatar'), controller.uploadAvatar, (error, _req, res, _next) => {
    res.status(400).send({ error: error.message });
});
router.get('/users/:id/avatar', controller.findUserAvatar);
router.delete('/users/me/avatar', auth, controller.deleteAvatar);
exports.default = router;
//# sourceMappingURL=users.js.map