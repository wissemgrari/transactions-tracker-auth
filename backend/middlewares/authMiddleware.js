const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // check if headers contains authorization
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  // Get token from headers authorization
  const token = authorization.split(' ')[1];

  try {
    // throw error if token not valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.user = {
      id: user._id.toString(),
      username: user.userName,
      email: user.email,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
module.exports = { requireAuth };
