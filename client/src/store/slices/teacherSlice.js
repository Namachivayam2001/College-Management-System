import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE_URL = 'http://localhost:8080/api'

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const token = auth.token || localStorage.getItem('token')

      if (!token) {
        return rejectWithValue('No token found')
      }

      const response = await fetch(`${API_BASE_URL}/admin/teachers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to fetch teachers')
      }

      return data.data
    } catch (error) {
      return rejectWithValue('Network error')
    }
  }
)

const initialState = {
  teachers: [],
  isLoading: false,
  error: null,
  selectedTeacher: null,
}

const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    clearTeacherError: (state) => {
      state.error = null
    },
    setSelectedTeacher: (state, action) => {
      state.selectedTeacher = action.payload
    },
    clearSelectedTeacher: (state) => {
      state.selectedTeacher = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.isLoading = false
        state.teachers = action.payload
        state.error = null
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearTeacherError, setSelectedTeacher, clearSelectedTeacher } = teacherSlice.actions
export default teacherSlice.reducer
