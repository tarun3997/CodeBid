const {FollowAndFollowing, GetFollowAndFollowing} = require('../controllers/userController/followAndFollowing')
const { isUserIsAdmin, getUserProfile} = require('../controllers/userController/profileController')

const router = require('express').Router()

router.get('/user-role',isUserIsAdmin)
// router.get('/user-profile',ProfileController)
router.get('/user-profile/:username?',getUserProfile)

router.post('/follow-and-unfollow', FollowAndFollowing)
router.get('/get-follower', GetFollowAndFollowing)

module.exports = router