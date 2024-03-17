const multer = require('multer');
const PostProject = require('../controllers/projectController/postProjectController');
const getAllProjects = require('../controllers/projectController/getAllProjectController');
const { postLikeController, postCommentsController, deletePostController } = require('../controllers/projectController/postUpdateController');

const router = require('express').Router()

const Storage = multer.diskStorage({
    destination: "./postedProjectImages",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({ storage: Storage });

 router.post('/post',upload.array("imageUrl"), PostProject)
 router.get('/get-projects',getAllProjects),
 router.post('/like', postLikeController)
 router.post('/comment', postCommentsController)
 router.post('/delete', deletePostController)

 module.exports = router;