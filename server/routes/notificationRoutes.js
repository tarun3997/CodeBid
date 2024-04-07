const {  getNotification } = require('../controllers/notificationController/getNotification')
const {likeNotification, commetnNotification} = require('../controllers/notificationController/postNotification')

const router = require('express').Router()

router.post('/like',likeNotification)
router.post('/comment',commetnNotification)


router.get('/get-like', getNotification)
module.exports = router