const {FollowAndFollowing, GetFollowAndFollowing} = require('../controllers/userController/followAndFollowing')
const { isUserIsAdmin, getUserProfile} = require('../controllers/userController/profileController')
const multer = require('multer');
const UpdateUserProfile = require('../controllers/userController/profileUpdate');
const router = require('express').Router()

const Storage = multer.diskStorage({
    destination: "./profileImages",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
router.get('/user-role',isUserIsAdmin)
// router.get('/user-profile',ProfileController)
router.get('/user-profile/:username?',getUserProfile)
const upload = multer({ storage: Storage });

router.post('update-profile', upload.single('profileImage'), UpdateUserProfile)

router.post('/follow-and-unfollow', FollowAndFollowing)
router.get('/get-follower', GetFollowAndFollowing)

module.exports = router