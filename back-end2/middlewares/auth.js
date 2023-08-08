const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
      return res.status(403).json({ msg: 'auth header doesnt exist' });

    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
      if (err) return res.status(403).json({ msg: 'token-verification-error' });
      const user = await User.findById(decode.user_id);
      if (!user) return res.status(403).json({ msg: 'token-error' });

      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error check in please try again.');
  }
};

module.exports = auth;
