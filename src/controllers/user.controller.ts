// @ts-ignore
import sharp from 'sharp'
import { sendWelcomeEmail, sendCancellationEmail } from '../emails/account'
const User = require('../models/user.model')

exports.createUser = async (req: any, res: any) => {
  try {
    const user = new User(req.body)
    sendWelcomeEmail(user.email, user.name)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send()
  }
}

exports.logoutUser = async (req: any, res: any) => {
  try {
    req.user.tokens = req.user.tokens.filter((token: { token: string }) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
}

exports.logoutAllUsers = async (req: any, res: any) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
}

exports.findUser = async (req: any, res: any) => {
  res.send(req.user)
}

exports.updateUser = async (req: any, res: any) => {
  const updates = Object.keys(req.body)
  const updatable = ['name', 'email', 'password']
  const isValidUpdate = updates.every(update => updatable.includes(update))

  if (!isValidUpdate) return res.status(400).send({ error: 'Invalid update' })

  try {
    const user = req.user
    updates.forEach(update => (user[update] = req.body[update]))
    await user.save()
    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.deleteUser = async (req: any, res: any) => {
  try {
    sendCancellationEmail(req.user.email, req.user.name)
    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.uploadAvatar = async (req: any, res: any) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}

exports.findUserAvatar = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) throw new Error()
    res.set('Content-Type', 'image/jpg')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
}

exports.deleteAvatar = async (req: any, res: any) => {
  try {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
}
