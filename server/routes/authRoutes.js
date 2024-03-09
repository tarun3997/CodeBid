const router = require('express').Router()
const multer = require('multer');
const {handelUserLogin, handelUserRegister, handelUserLogout} = require('../controllers/authController')
const Storage = multer.diskStorage({
    destination: "./profileImages",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({ storage: Storage });
router.post('/register',upload.single("profileImage"), handelUserRegister);

router.post('/login', handelUserLogin)

router.post('/logout', handelUserLogout)

module.exports = router;