const router = require('express').Router();
const { createNewUser, loginUser } = require('../controllers/authController');

router.post('/createUser', createNewUser);
router.post('/loginUser', loginUser);

module.exports = router;
