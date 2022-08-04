const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionsSchema);
