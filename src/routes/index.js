const express = require('express')
const router = new express.Router()

/* GET home page. */
router.get('/', (_req, res, _next) => {
  res.json({ message: 'Welcome to the backend!' })
})

module.exports = router
