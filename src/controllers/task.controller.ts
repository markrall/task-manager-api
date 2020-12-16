const Task = require('../models/task.model')

exports.createTask = async (req: any, res: any) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (err) {
    res.status(400).send(err)
  }
}

// GET /tasks?completed=true | false
// GET /tasks?limit=10&skip=n+10
// GET /tasks?sort=[field1]:[ASC|DESC]&[field2]:[ASC|DESC]
exports.findTasks = async (req: any, res: any) => {
  const match = {}
  const sort = {}

  // @ts-ignore
  if (req.query.completed) match.completed = req.query.completed === 'true'

  if (req.query.sortBy) {
    const segments = req.query.sortBy.split('_')
    segments.forEach((segment: string) => {
      const parts = segment.split(':')
      // @ts-ignore
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    })
  }

  try {
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate()
    res.send(req.user.tasks)
  } catch (err) {
    res.status(500)
  }
}

exports.findTask = async (req: any, res: any) => {
  const _id = req.params.id
  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    })
    if (!task) return res.status(404).send()
    res.send(task)
  } catch (err) {
    res.status(500).send()
  }
}

exports.updateTask = async (req: any, res: any) => {
  const updates = Object.keys(req.body)
  const updatable = ['description', 'completed']
  const isValidUpdate = updates.every(update => updatable.includes(update))

  if (!isValidUpdate) return res.status(400).send({ error: 'Invalid update' })

  try {
    const _id = req.params.id
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    })

    if (!task) return res.status(404).send()

    updates.forEach(update => (task[update] = req.body[update]))
    await task.save()
    res.send(task)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.deleteTask = async (req: any, res: any) => {
  try {
    const _id = req.params.id
    const task = await Task.findOneAndDelete({
      _id,
      owner: req.user._id,
    })

    if (!task) return res.status(404).send()
    res.send(task)
  } catch (err) {
    res.status(500).send()
  }
}
