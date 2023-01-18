const User = require('../models/userModel');

const createNewUser = async (req, res) => {
  try {
    const data = ({ uid, userName, email } = req.body);
    console.log(data);

    // create a new user
    const newUser = await new User({
      uid: uid,
      userName: userName,
      email: email,
    }).save();

    res.json({ user: newUser, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);
};

const checkLoggedIn = async (req, res) => {
  const user = await auth().verifyIdToken(req.body.token);
  console.log(user.uid);
  auth()
    .getUser(user.uid)
    .then(async (userRecord) => {
      console.log(await userRecord);
      const uid = userRecord.uid;
      // ...
      res.json({ user: userRecord });
    })
    .catch((error) => {
      // Handle error
    });
};

module.exports = { createNewUser, loginUser, checkLoggedIn };
