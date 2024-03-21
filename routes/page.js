const express = require('express')
const router = express.Router()
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

router.use((req, res, next) => {
  res.locals.user = req.user || null
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followIdList = []
  next()
})

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: "내 정보 - NodeBird" })
})

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' })
})

router.get('/', (req, res) => {
  const twits = []
  res.render('main', { title: 'NordBird', twits })
})

module.exports = router