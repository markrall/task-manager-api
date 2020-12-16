const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task.model')
const { u1, u2, task1, task2, task3, setUpDB } = require('./fixtures/db')

// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks

beforeEach(setUpDB)

test('should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', 'Bearer ' + u1.tokens[0].token)
    .send({
      description: 'New task from task.tast.js',
    })
    .expect(201)

  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.description).toEqual(response.body.description)
  expect(task.completed).toBe(false)
})

test('should update valid task fields for current user', async () => {
  await request(app)
    .patch('/tasks/' + task3._id)
    .set('Authorization', 'Bearer ' + u2.tokens[0].token)
    .send({
      description: 'UPDATED: ' + task3.description,
      completed: !task3.completed,
    })
    .expect(200)
})

test('should fetch authorised users tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', 'Bearer ' + u1.tokens[0].token)
    .send()
    .expect(200)

  expect(response.body.length).toEqual(2)
})

test('should not delete other users tasks', async () => {
  request(app)
    .delete('/tasks/' + task1._id)
    .set('Authorization', 'Bearer ' + u2.tokens[0].token)
    .send()
    .expect(404)

  const task = await Task.findById(task1._id)
  expect(task).not.toBeNull()
})
