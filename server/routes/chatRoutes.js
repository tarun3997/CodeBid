const userList = require('../controllers/chatController/userList')

const router = require('express').Router()

router.get('/user-list',userList)

module.exports = router;