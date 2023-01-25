const jwt = require('jsonwebtoken');

const authMiddlware = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Auth Error' });
  jwt.verify(token, process.env.JWT_SECRECT, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRECT);
  //   console.log(decoded);
  //   req.user = decoded.user;
  //   next();
  // } catch (e) {
  //   console.error(e);
  //   res.status(500).send({ message: 'Invalid Token' });
  // }
};

module.exports = { authMiddlware };
