import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

export const fetchDepartments = createAsyncThunk(
  'departments/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const token = auth.token || localStorage.getItem('token')

      if (!token) {
        return rejectWithValue('No token found')
      }

      const response = await fetch(`${API_BASE_URL}/admin/departments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to fetch departments')
      }

      return data.data
    } catch (error) {
      return rejectWithValue('Network error')
    }
  }
)

export const createDepartment = createAsyncThunk(
  'departments/create',
  async (departmentData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const token = auth.token || localStorage.getItem('token')

      if (!token) {
        return rejectWithValue('No token found')
      }

      const response = await fetch(`${API_BASE_URL}/admin/departments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(departmentData),
      })

      const data = await response.json()

      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to create department')
      }

      return data.data
    } catch (error) {
      return rejectWithValue('Network error')
    }
  }
)

const initialState = {
  departments: [],
  isLoading: false,
  error: null,
  selectedDepartment: null,
}

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    clearDepartmentError: (state) => {
      state.error = null
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload
    },
    clearSelectedDepartment: (state) => {
      state.selectedDepartment = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.isLoading = false
        state.departments = action.payload
        state.error = null
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.departments.unshift(action.payload)
        state.error = null
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { clearDepartmentError, setSelectedDepartment, clearSelectedDepartment } = departmentSlice.actions
export default departmentSlice.reducer

