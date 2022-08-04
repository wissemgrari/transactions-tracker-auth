import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionService from './transactionService';

// GET TRANSACTIONS FORM LOCALSTORAGE AFTER FETCH'EM
const transactions = JSON.parse(localStorage.getItem('transactions'));

const initialState = {
  transactions: transactions ? transactions : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// GET USER TRANSACTIONS
export const getTransactions = createAsyncThunk(
  'transaction/get',
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;
    const data = await transactionService.getTransactions(token);
    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    }
    return data;
  }
);

// CREATE NEW TRANSACTION
export const createTransaction = createAsyncThunk(
  'transaction/create',
  async (userData, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;
    const data = await transactionService.createTransaction(userData, token);
    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    }
    return data;
  }
);

// DELETE SINGLE TRANSACTION
export const deleteTransaction = createAsyncThunk(
  'transaction/delete',
  async (id, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;
    const data = await transactionService.removeTransaction(id, token);
    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    }
    return data;
  }
);

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions.unshift(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = state.transactions.filter(
          (transaction) => transaction._id !== action.payload._id
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
