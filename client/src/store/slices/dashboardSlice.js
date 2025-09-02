import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ERROR_NETWORK = import.meta.env.VITE_ERROR_NETWORK;
const API_DASHBOARD_ADMIN = import.meta.env.VITE_API_DASHBOARD_ADMIN;

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const token = auth.token || localStorage.getItem('token')

      if (!token) {
        return rejectWithValue('No token found')
      }

      const response = await fetch(`${API_BASE_URL}${API_DASHBOARD_ADMIN}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to fetch dashboard stats')
      }

      return data.data
    } catch (error) {
      return rejectWithValue(ERROR_NETWORK)
    }
  }
)

const initialState = {
  stats: null,
  isLoading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload
        state.error = null
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearDashboardError } = dashboardSlice.actions
export default dashboardSlice.reducer

