const mongoose = require('mongoose');
const Transaction = require('../models/transactionsModel');

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  if (!transactions) {
    return res.status(400).json({ error: 'Something went wrong' });
  }
  res.status(200).json(transactions);
};

// @desc    create transaction
// @route   POST /api/transactions
// @access  Private
const createTransaction = async (req, res) => {
  const { type, category, amount, date } = req.body;
  let emptyFields = [];
  if (!type) {
    emptyFields.push('Type');
  }
  if (!category) {
    emptyFields.push('Category');
  }
  if (!amount) {
    emptyFields.push('Amount');
  }
  if (!date) {
    emptyFields.push('Date');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }

  // save to database
  try {
    const transaction = await Transaction.create({
      user: req.user.id,
      type,
      category,
      amount,
      date,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    remove transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const removeTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such transaction' });
  }

  const transaction = await Transaction.findById(id);
  // check if transaction exists
  if (!transaction) {
    return res.status(400).json({ error: 'No such transaction' });
  }

  // Make sure the logged in user matches the transaction user
  if (req.user.id !== transaction.user._id.toString()) {
    return res.status(401).json({ error: 'User NOT authorized' });
  }

  // // remove the transaction
  const deleted = await transaction.remove();
  return res.status(200).json(deleted);
};

module.exports = {
  getTransactions,
  createTransaction,
  removeTransaction,
};
