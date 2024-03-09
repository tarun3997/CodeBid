const multer = require('multer');
const PostProject = require('../controllers/projectController/postProjectController');
const getAllProjects = require('../controllers/projectController/getAllProjectController');

const router = require('express').Router()

const Storage = multer.diskStorage({
    destination: "./postedProjectImages",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({ storage: Storage });

 router.post('/post',upload.array("imageUrl",5), PostProject)
 router.get('/get-projects',getAllProjects)

 module.exports = router;