const {ProfileController , isUserIsAdmin} = require('../controllers/userController/profileController')

const router = require('express').Router()

router.get('/user-profile',ProfileController)
router.get('/user-role',isUserIsAdmin)

module.exports = router