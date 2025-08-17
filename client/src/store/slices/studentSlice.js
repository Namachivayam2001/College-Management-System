import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const token = auth.token || localStorage.getItem('token')

      if (!token) {
        return rejectWithValue('No token found')
      }

      const response = await fetch(`${API_BASE_URL}/admin/students`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to fetch students')
      }

      return data.data
    } catch (error) {
      return rejectWithValue('Network error')
    }
  }
)

const initialState = {
  students: [],
  isLoading: false,
  error: null,
  selectedStudent: null,
}

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearStudentError: (state) => {
      state.error = null
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false
        state.students = action.payload
        state.error = null
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearStudentError, setSelectedStudent, clearSelectedStudent } = studentSlice.actions
export default studentSlice.reducer

