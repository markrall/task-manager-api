"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./db/mongoose");
const body_parser_1 = __importDefault(require("body-parser"));
// const cors = require('cors')
// const logger = require('morgan')
// const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const app = express_1.default();
// const corsOptions = {
//   origin: 'http://localhost:8081',
// }
// app.use(logger('dev'))
// app.use(cors(corsOptions))
app.use(body_parser_1.default.json({ strict: true }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(indexRouter)
app.use(usersRouter);
app.use(tasksRouter);
module.exports = app;
//# sourceMappingURL=app.js.map