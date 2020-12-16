import request from 'supertest'
import app from '../src/app'
import User from '../src/models/user.model'
import { u1ID, u1, setUpDB } from './fixtures/db'

// Additional User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

beforeEach(setUpDB)

test('should sign up a new user', async () => {
  const registrant = {
    name: 'Mark',
    email: 'mark@example.com',
    password: 'r5_9)Gq2!@135',
  }
  const response = await request(app)
    .post('/users')
    .send(registrant)
    .expect(201)

  // assert the user has been created in the DB
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: registrant.name,
      email: registrant.email,
    },
    token: user.tokens[0].token,
  })

  // assert plain text pwd is not saved to DB
  expect(user.password).not.toBe(registrant.password)
})

test('should login registered user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: u1.email,
      password: u1.password,
    })
    .expect(200)

  // assert a valid new token has been saved
  const user = await User.findById(u1ID)
  expect(response.body.token).toBe(user.tokens[user.tokens.length - 1].token)
})

test('should not login unregistered user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: u1.email,
      password: u1.password + '!',
    })
    .expect(400)
})

test('should get profile for authenticated user', async () => {
  await request(app)
    .get('/users/me/')
    .set('Authorization', 'Bearer ' + u1.tokens[0].token)
    .send()
    .expect(200)
    .expect('Content-Type', /json/)
})

test('should not get profile for authenticated user', async () => {
  await request(app)
    .get('/users/me/')
    .set('Authorization', 'Bearer ')
    .send()
    .expect(401)
})

test('should delete account for authenticated user', async () => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', 'Bearer ' + u1.tokens[0].token)
    .send()
    .expect(200)

  // validate the user has been deleted from the db
  const user = await User.findById(u1ID)
  expect(user).toBeNull()
})

test('should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', 'Bearer ')
    .send()
    .expect(401)
})

test('should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', 'Bearer ' + u1.tokens[0].token)
    .attach('avatar', 'tests/fixtures/avatar-mark.png')
    .expect(200)

  const user = await User.findById(u1ID)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user fields', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Authorization', 'Bearer ' + u1.tokens[0].token)
    .send({
      name: u1.name + 'ster',
    })
    .expect(200)

  const user = await User.findById(u1ID)
  expect(user.name).toBe(u1.name + 'ster')
})

test('should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', 'Bearer ' + u1.tokens[0].token)
    .send({
      hobbies: ['fishing'],
    })
    .expect(400)
})
