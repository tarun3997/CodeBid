const ProfileController = require('../controllers/userController/profileController')

const router = require('express').Router()

router.get('/user-profile',ProfileController)

module.exports = router