const API_URL = 'http://localhost:5000';

// GET TRANSACTIONS
const getTransactions = async (token) => {
  const response = await fetch(`${API_URL}/api/transactions/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  if (response.ok) {
    localStorage.setItem('transactions', JSON.stringify(json));
  }
  return json;
};

// CREATE NEW TRANSACTION
const createTransaction = async (data, token) => {
  const response = await fetch(`${API_URL}/api/transactions/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

// DELETE TRANSACTION
const removeTransaction = async (id, token) => {
  const response = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return json;
};

const transactionService = {
  getTransactions,
  createTransaction,
  removeTransaction,
};
export default transactionService;
