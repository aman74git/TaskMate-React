require('dotenv').config();
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const refreshHandler = async (req, res) => {
  try {
    console.log(req.cookies);
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken)
      return res.status(403).json({ msg: 'cookie doesnt exist' });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decode) => {
        if (err)
          return res
            .status(403)
            .json({ msg: 'refresh-token-verification-error' });
        const userId = decode.user_id;
        const user = await User.findById(userId);

        if (!user)
          return res.status(403).json({ msg: 'refresh-token-user-error' });
        if (!user.refreshTokens.includes(refreshToken))
          return res.status(403).json({ msg: 'refresh-token-error' });

        const accessToken = jwt.sign(
          { user_id: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30m' }
        );

        res.status(200).json({ accessToken, userName: user.name });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

module.exports = refreshHandler;
