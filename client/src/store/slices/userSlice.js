import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const token = auth.token || localStorage.getItem('token')

      if (!token) {
        return rejectWithValue('No token found')
      }

      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to fetch users')
      }

      return data.data
    } catch (error) {
      return rejectWithValue('Network error')
    }
  }
)

export const createUser = createAsyncThunk(
  'users/create',
  async (userData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const token = auth.token || localStorage.getItem('token')

      if (!token) {
        return rejectWithValue('No token found')
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to create user')
      }

      return data.data
    } catch (error) {
      return rejectWithValue('Network error')
    }
  }
)

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  selectedUser: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
        state.error = null
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload)
        state.error = null
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { clearUserError, setSelectedUser, clearSelectedUser } = userSlice.actions
export default userSlice.reducer
