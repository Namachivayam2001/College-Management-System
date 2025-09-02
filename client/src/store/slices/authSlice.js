import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_AUTH_PROFILE = import.meta.env.VITE_API_AUTH_PROFILE;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_AUTH_LOGIN = import.meta.env.VITE_API_AUTH_LOGIN;
const ERROR_NETWORK = import.meta.env.VITE_ERROR_NETWORK;

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Attempting login with:', credentials);
      console.log('API URL:', `${API_BASE_URL}${API_AUTH_LOGIN}`);
      
      const response = await fetch(`${API_BASE_URL}${API_AUTH_LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data = await response.json()
      console.log('Response data:', data);

      if (!data.success) {
        return rejectWithValue(data.message || 'Login failed')
      }

      // Store token in localStorage
      localStorage.setItem('token', data.data.token)
      return data
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(ERROR_NETWORK)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('token')
      return { success: true }
    } catch (error) {
      return rejectWithValue('Logout failed')
    }
  }
)

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const token = auth.token || localStorage.getItem('token')

      if (!token) {
        return rejectWithValue('No token found')
      }

      const response = await fetch(`${SERVER_BASE_URL}${API_AUTH_PROFILE}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to get profile')
      }

      return data.data
    } catch (error) {
      return rejectWithValue(ERROR_NETWORK)
    }
  }
)

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.data.user
        state.token = action.payload.data.token
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, setLoading } = authSlice.actions
export default authSlice.reducer
