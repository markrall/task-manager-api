"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
require("./db/mongoose");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
// const cors = require('cors')
// const logger = require('morgan')
// const indexRouter = require('./routes/index')
const routes_1 = require("./routes/");
const app = express_1.default();
// const corsOptions = {
//   origin: 'http://localhost:8081',
// }
// app.use(logger('dev'))
// app.use(cors(corsOptions))
app.use(body_parser_1.default.json({ strict: true }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(indexRouter)
app.use(routes_1.usersRouter);
app.use(routes_1.tasksRouter);
module.exports = app;
//# sourceMappingURL=app.js.map