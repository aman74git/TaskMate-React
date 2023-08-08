require('dotenv').config();
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const logoutHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken)
      return res.status(204).json({ msg: 'cookie doesnt exist' });

    res.clearCookie('jwt');

    if (req.query.type === 'expired') return res.sendStatus(200);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decode) => {
        if (err) return res.sendStatus(200);

        const userId = decode.user_id;
        const user = await User.findById(userId);

        if (req.query.type === 'current') {
          user.refreshTokens = user.refreshTokens.filter(
            (token) => token !== refreshToken
          );
        } else if (req.query.type === 'all') {
          user.refreshTokens = [];
        } else if (req.query.type) {
          return res.status(400).json({ msg: 'invalid logout type' });
        } else {
          return res.status(400).json({ msg: "can't get logout type" });
        }
        user.save();
        //clear jwt cookie
        res.sendStatus(200);
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

module.exports = logoutHandler;
