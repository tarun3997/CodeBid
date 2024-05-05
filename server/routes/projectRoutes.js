const multer = require('multer');
const PostProject = require('../controllers/projectController/postProjectController');
const getAllProjects = require('../controllers/projectController/getAllProjectController');
const { postLikeController, postCommentsController, deletePostController, updatePostController, postViewsController, postSavedController, postRattingController } = require('../controllers/projectController/postUpdateController');
const getAllUserProject = require('../controllers/projectController/getUserProjectController');
const PostDetails = require('../controllers/projectController/getPostDetails');
const getSavedPost = require('../controllers/projectController/getSavedPost');

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
 router.post('/view', postViewsController)
 router.post('/saved', postSavedController)
 router.post('/ratting', postRattingController)
 router.post('/comment', postCommentsController)
 router.post('/delete', deletePostController)
 router.post('/update', updatePostController)
 router.get('/user-post/:username?',getAllUserProject)
 router.get('/saved-post',getSavedPost)
 router.get('/post-detail/:projectId', PostDetails)

 module.exports = router;