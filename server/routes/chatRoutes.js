const userChat = require('../controllers/chatController/userChat');
const userList = require('../controllers/chatController/userList');
const searchUser = require('../controllers/chatController/userSearch');

const router = require('express').Router()

router.get('/user-list',userList)
router.get('/user-chat/:receivedId',userChat)
router.get('/search-user',searchUser)

module.exports = router;