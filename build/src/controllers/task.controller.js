"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Task = require('../models/task.model');
exports.createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new Task(Object.assign(Object.assign({}, req.body), { owner: req.user._id }));
    try {
        yield task.save();
        res.status(201).send(task);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
// GET /tasks?completed=true | false
// GET /tasks?limit=10&skip=n+10
// GET /tasks?sort=[field1]:[ASC|DESC]&[field2]:[ASC|DESC]
exports.findTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const match = {};
    const sort = {};
    // @ts-ignore
    if (req.query.completed)
        match.completed = req.query.completed === 'true';
    if (req.query.sortBy) {
        const segments = req.query.sortBy.split('_');
        segments.forEach((segment) => {
            const parts = segment.split(':');
            // @ts-ignore
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        });
    }
    try {
        yield req.user
            .populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            },
        })
            .execPopulate();
        res.send(req.user.tasks);
    }
    catch (err) {
        res.status(500);
    }
});
exports.findTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const task = yield Task.findOne({
            _id,
            owner: req.user._id,
        });
        if (!task)
            return res.status(404).send();
        res.send(task);
    }
    catch (err) {
        res.status(500).send();
    }
});
exports.updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const updatable = ['description', 'completed'];
    const isValidUpdate = updates.every(update => updatable.includes(update));
    if (!isValidUpdate)
        return res.status(400).send({ error: 'Invalid update' });
    try {
        const _id = req.params.id;
        const task = yield Task.findOne({
            _id,
            owner: req.user._id,
        });
        if (!task)
            return res.status(404).send();
        updates.forEach(update => (task[update] = req.body[update]));
        yield task.save();
        res.send(task);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const task = yield Task.findOneAndDelete({
            _id,
            owner: req.user._id,
        });
        if (!task)
            return res.status(404).send();
        res.send(task);
    }
    catch (err) {
        res.status(500).send();
    }
});
//# sourceMappingURL=task.controller.js.map