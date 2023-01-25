const User = require('../models/userModel.js');
const { auth } = require('../services/firebase.js');

const authenticate = async (req, res, next) => {
  try {
    const firebaseToken = req.headers.authorization?.split(' ')[1];
    let firebaseUser;
    if (firebaseToken) {
      firebaseUser = await auth.verifyIdToken(firebaseToken);
    }

    // console.log(firebaseUser);
    if (!firebaseUser) {
      // Unauthorized
      return res.sendStatus(401);
    }

    const user = await User.findOne({
      firebaseId: firebaseUser.user_id,
    });

    if (!user) {
      // Unauthorized
      return res.sendStatus(401);
    }

    req.user = user;

    next();
  } catch (err) {
    //Unauthorized
    res.sendStatus(401);
  }
};

module.exports = { authenticate };
