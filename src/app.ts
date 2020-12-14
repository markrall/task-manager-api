import express from 'express'
import './db/mongoose'
import bodyParser from 'body-parser'
// const cors = require('cors')
// const logger = require('morgan')

// const indexRouter = require('./routes/index')
import {usersRouter, tasksRouter} from './routes/'

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
