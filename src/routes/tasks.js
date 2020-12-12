const express = require('express')
const controller = require('../controllers/task.controller')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, controller.createTask)

router.get('/tasks', auth, controller.findTasks)

router.get('/tasks/:id', auth, controller.findTask)

router.patch('/tasks/:id', auth, controller.updateTask)

router.delete('/tasks/:id', auth, controller.deleteTask)

module.exports = router
