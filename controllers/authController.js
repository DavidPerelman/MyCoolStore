const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth } = require('../services/firebase');

const createNewUser = async (req, res) => {
  try {
    const data = ({ userName, email, password } = req.body);

    // create a new user
    const newUser = await new User({
      userName: userName,
      email: email,
      password: password,
    }).save();

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const token = jwt.sign(
      {
        username: newUser.email,
        id: newUser._id,
      },
      process.env.JWT_SECRECT
    );

    console.log(newUser);

    res.json({ user: newUser, success: true, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const loginUser = async (req, res) => {
  console.log('check1');

  const { email, password } = req.body;
  console.log(email);
  try {
    let user = await User.findOne({
      email: email,
    });
    if (!user)
      return res.status(400).json({
        message: 'User Not Exist',
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: 'Incorrect Password !',
      });

    console.log(user);
    const token = jwt.sign(
      {
        username: user.email,
        id: user._id,
      },
      process.env.JWT_SECRECT,
      {
        expiresIn: 3600,
      }
    );

    console.log('check5');

    res.status(200).json({
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Server Error',
    });
  }
};

const checkLoggedIn = async (req, res) => {
  const user = await auth().verifyIdToken(req.body.token);
  auth()
    .getUser(user.uid)
    .then(async (userRecord) => {
      const uid = userRecord.uid;
      // ...
      res.json({ user: userRecord });
    })
    .catch((error) => {
      // Handle error
    });
};

const createFirebaseUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const newFirebaseUser = await auth.createUser({ email, password });

    if (newFirebaseUser) {
      console.log('newFirebaseUser');
      const newUser = await new User({
        userName: userName,
        email: email,
        firebaseId: newFirebaseUser.uid,
      }).save();
    }
    return res
      .status(200)
      .json({ success: 'Account created successfully. Please sign in.' });
  } catch (err) {
    if (err.code === 'auth/email-already-exists') {
      return res
        .status(400)
        .json({ error: 'User account already exists at email address.' });
    }
    return res.status(500).json({ error: 'Server error. Please try again' });
  }
};

module.exports = {
  createNewUser,
  loginUser,
  checkLoggedIn,
  createFirebaseUser,
};
