import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_CONFIG, API_ENDPOINTS, ERROR_MESSAGES } from '../../config/config'

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const token = auth.token || localStorage.getItem('token')

      if (!token) {
        return rejectWithValue('No token found')
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.DASHBOARD.ADMIN}`, {
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
      return rejectWithValue(ERROR_MESSAGES.NETWORK_ERROR)
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

