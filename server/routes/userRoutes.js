const {FollowAndFollowing, GetFollowAndFollowing} = require('../controllers/userController/followAndFollowing')
const {ProfileController , isUserIsAdmin} = require('../controllers/userController/profileController')

const router = require('express').Router()

router.get('/user-profile',ProfileController)
router.get('/user-role',isUserIsAdmin)

router.post('/follow-and-unfollow', FollowAndFollowing)
router.get('/get-follower', GetFollowAndFollowing)

module.exports = router