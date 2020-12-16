"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const controller = require('../controllers/task.controller');
const auth = require('../middleware/auth');
const router = express_1.default.Router();
router.post('/tasks', auth, controller.createTask);
router.get('/tasks', auth, controller.findTasks);
router.get('/tasks/:id', auth, controller.findTask);
router.patch('/tasks/:id', auth, controller.updateTask);
router.delete('/tasks/:id', auth, controller.deleteTask);
exports.default = router;
//# sourceMappingURL=tasks.js.map