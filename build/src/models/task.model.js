"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    due: {
        type: Date,
        required: false,
        default: null,
    },
    tags: {
        type: Array,
        required: false
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const Task = mongoose_1.model('Task', TaskSchema);
module.exports = Task;
//# sourceMappingURL=task.model.js.map