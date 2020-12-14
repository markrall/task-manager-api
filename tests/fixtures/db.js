const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user.model')
const Task = require('../../src/models/task.model')

const u1ID = new mongoose.Types.ObjectId()
const u1 = {
  _id: u1ID,
  name: 'User 1',
  email: 'user1@example.com',
  password: 'bGjf%67bJO_9',
  tokens: [
    {
      token: jwt.sign({ _id: u1ID }, process.env.JWT),
    },
  ],
}

const u2ID = new mongoose.Types.ObjectId()
const u2 = {
  _id: u2ID,
  name: 'User 2',
  email: 'user2@example.com',
  password: 'bGjf%67bJO_9',
  tokens: [
    {
      token: jwt.sign({ _id: u2ID }, process.env.JWT),
    },
  ],
}

const task1 = {
  _id: new mongoose.Types.ObjectId(),
  description: 'My first task',
  completed: false,
  owner: u1._id,
}

const task2 = {
  _id: new mongoose.Types.ObjectId(),
  description: 'My second task',
  completed: true,
  owner: u1._id,
}

const task3 = {
  _id: new mongoose.Types.ObjectId(),
  description: 'My third task',
  completed: true,
  owner: u2._id,
}

const setUpDB = async () => {
  await User.deleteMany()
  await new User(u1).save()
  await new User(u2).save()
  await Task.deleteMany()
  await new Task(task1).save()
  await new Task(task2).save()
  await new Task(task3).save()
}

module.exports = {
  u1ID,
  u1,
  u2ID,
  u2,
  task1,
  task2,
  task3,
  setUpDB,
}
