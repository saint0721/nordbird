const express = require('express')
const { isLoggedIn } = require('./middlewares')
const User = require('../models/user')

const router = express.Router()

router.post('/:id/follow', isLoggedIn, async(req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } })
    if (user) {
      await User.addFollowing(parseInt(req.params.id, 10))
      res.send('success')
    } else {
      res.status(404).send('no user')
    }
  } catch(err) {
    console.error(err)
    next(err)
  }
})

module.exports = router