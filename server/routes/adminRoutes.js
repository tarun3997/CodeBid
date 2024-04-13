const router = require('express').Router()
const { getTotalProject } = require('../controllers/adminController/adminProjectController')
const {getAllUserCount , getUsersAddedToday, getAllUser, deleteUser, makeAdmin} = require('../controllers/adminController/getAllUserController')

router.get('/all-user', getAllUserCount)
router.get('/new-user', getUsersAddedToday)
router.get('/user-list', getAllUser)
router.post('/delete-user', deleteUser)
router.post('/change-role', makeAdmin)

router.get('/total-project',getTotalProject)

module.exports= router;