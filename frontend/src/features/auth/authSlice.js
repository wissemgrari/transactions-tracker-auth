import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Signing up users
export const signup = createAsyncThunk(
  'auth/signup',
  async (user, thunkAPI) => {
    const data = await authService.signup(user);
    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    }
    return data;
  }
);

// Signin in users
export const signin = createAsyncThunk(
  'auth/signin',
  async (user, thunkAPI) => {
    const data = await authService.signin(user);
    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    }
    return data;
  }
);

// loginin out user
export const logout = createAsyncThunk('auth/logout', () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    toggleDarkMode: (state) => {
      let theme = JSON.parse(localStorage.getItem('darkTheme'));
      localStorage.setItem('darkTheme', !theme);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset, toggleDarkMode } = authSlice.actions;
export default authSlice.reducer;
