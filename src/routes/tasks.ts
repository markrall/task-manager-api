
import express from 'express'
const controller = require('../controllers/task.controller')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/tasks', auth, controller.createTask)

router.get('/tasks', auth, controller.findTasks)

router.get('/tasks/:id', auth, controller.findTask)

router.patch('/tasks/:id', auth, controller.updateTask)

router.delete('/tasks/:id', auth, controller.deleteTask)

export default router
