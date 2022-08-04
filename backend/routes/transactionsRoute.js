const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/authMiddleware');

const {
  getTransactions,
  createTransaction,
  removeTransaction,
} = require('../controllers/transactionsController');

// Get all transactions
router
  .route('/transactions')
  .get(requireAuth, getTransactions)
  .post(requireAuth, createTransaction);
router.delete('/transactions/:id', requireAuth, removeTransaction);

module.exports = router;
