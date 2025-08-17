import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_CONFIG, API_ENDPOINTS, ERROR_MESSAGES } from '../../config/config';

// Async thunk to fetch admin dashboard data
export const fetchAdminDashboard = createAsyncThunk(
  'adminDashboard/fetchData',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      if (!token) {
        return rejectWithValue(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.DASHBOARD.ADMIN}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to fetch dashboard data');
      }

      return data.data;
    } catch (error) {
      console.error('Admin dashboard fetch error:', error);
      return rejectWithValue(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }
);

const initialState = {
  stats: {
    totalUsers: 0,
    totalDepartments: 0,
    totalTeachers: 0,
    totalStudents: 0
  },
  recentUsers: [],
  recentDepartments: [],
  isLoading: false,
  error: null
};

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearData: (state) => {
      state.stats = initialState.stats;
      state.recentUsers = [];
      state.recentDepartments = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.stats;
        state.recentUsers = action.payload.recentUsers;
        state.recentDepartments = action.payload.recentDepartments;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearData } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
