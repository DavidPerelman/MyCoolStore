const router = require('express').Router();
const {
  createNewUser,
  loginUser,
  createFirebaseUser,
} = require('../controllers/authController');

router.post('/createUser', createNewUser);
router.post('/loginUser', loginUser);
router.post('/firebase/create', createFirebaseUser);

module.exports = router;
