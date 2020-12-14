const express = require('express')
require('./db/mongoose')
const bodyParser = require('body-parser')
// const cors = require('cors')
// const logger = require('morgan')

// const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const tasksRouter = require('./routes/tasks')

const app = express()

// const corsOptions = {
//   origin: 'http://localhost:8081',
// }

// app.use(logger('dev'))
// app.use(cors(corsOptions))
app.use(bodyParser.json({ strict: true }))
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(indexRouter)
app.use(usersRouter)
app.use(tasksRouter)

module.exports = app
