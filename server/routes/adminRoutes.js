const router = require('express').Router()
const {getAllUserCount , getUsersAddedToday, getAllUser, deleteUser} = require('../controllers/adminController/getAllUserController')

router.get('/all-user', getAllUserCount)
router.get('/new-user', getUsersAddedToday)
router.get('/user-list', getAllUser)
router.post('/delete-user', deleteUser)

module.exports= router;