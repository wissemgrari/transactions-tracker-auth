const API_URL = 'https://transaction-tracker.onrender.com';

// Signing up users
const signup = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const json = await response.json();
  return json;
};

// Signin in users
const signin = async (userData) => {
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const json = await response.json();
  if (response.ok) {
    localStorage.setItem('user', JSON.stringify(json));
  }
  return json;
};

// logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('transactions');
};

const authService = {
  signup,
  signin,
  logout,
};
export default authService;
