import { createSlice } from '@reduxjs/toolkit';

const mockStudents = [
  { id: '1', name: 'John Doe', rollNumber: 'CS2101', class: 'CSE-3A', email: 'john@college.edu' },
  { id: '2', name: 'Jane Smith', rollNumber: 'CS2102', class: 'CSE-3A', email: 'jane@college.edu' },
  { id: '3', name: 'Mike Johnson', rollNumber: 'CS2103', class: 'CSE-3A', email: 'mike@college.edu' },
  { id: '4', name: 'Sarah Wilson', rollNumber: 'CS2104', class: 'CSE-3A', email: 'sarah@college.edu' },
];

const mockRecords = [
  {
    id: '1',
    studentId: '1',
    date: '2024-01-15',
    status: 'present',
    subject: 'Data Structures',
    teacher: 'Dr. Smith',
  },
  {
    id: '2',
    studentId: '2',
    date: '2024-01-15',
    status: 'present',
    subject: 'Data Structures',
    teacher: 'Dr. Smith',
  },
  {
    id: '3',
    studentId: '3',
    date: '2024-01-15',
    status: 'absent',
    subject: 'Data Structures',
    teacher: 'Dr. Smith',
  },
];

const initialState = {
  students: mockStudents,
  records: mockRecords,
  selectedClass: 'CSE-3A',
  loading: false,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    addAttendanceRecord: (state, action) => {
      state.records.push(action.payload);
    },
    updateAttendanceRecord: (state, action) => {
      const index = state.records.findIndex(record => record.id === action.payload.id);
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
    setSelectedClass: (state, action) => {
      state.selectedClass = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setStudents,
  addAttendanceRecord,
  updateAttendanceRecord,
  setSelectedClass,
  setLoading
} = attendanceSlice.actions;

export default attendanceSlice.reducer;