const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async (req: any, res: any, next: any) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) throw new Error()

    req.token = token
    req.user = user
    next()
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate' })
  }
}

module.exports = auth
