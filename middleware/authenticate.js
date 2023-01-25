import User from '../models/userModel.js';
import { auth } from '../services/firebase.js';

const authenticate = async (req, res, next) => {
  try {
    const firebaseToken = req.headers.authorization?.split(' ')[1];

    let firebaseUser;
    if (firebaseToken) {
      firebaseUser = await auth.verifyIdToken(firebaseToken);
    }

    if (!firebaseUser) {
      // Unauthorized
      return res.sendStatus(401);
    }

    const usersCollection = req.app.locals.db.collection('user');

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
