const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// @desc    Signup new user
// @route   POST /signup
// @access  Public
const signup = async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  // check for the empty fields
  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // check if the email is being used
  const isExists = await User.findOne({ email });
  if (isExists) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Save the user to the DB
  const user = await User.create({
    fullName,
    email,
    phone,
    password: hashedPassword,
  });

  if (!user) {
    return res.status(400).json({ error: 'Something went wrong' });
  }

  res.status(201).json({
    fullName,
    email,
  });
};

// @desc    Signin user
// @route   POST /signin
// @access  Public
const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User does not exists' });
  }

  // check if passwords match
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // generate token for user
  const token = generateToken(user._id);

  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email,
    phone: user.phone,
    token,
    createdAt: user.createdAt,
  });
};

module.exports = {
  signup,
  signin,
};
