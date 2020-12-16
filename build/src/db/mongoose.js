"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
mongoose_1.default
    .connect(process.env.MDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => {
    console.log('Database connected');
})
    .catch((err) => {
    console.log('Databse connection error', err);
    process.exit();
});
//# sourceMappingURL=mongoose.js.map