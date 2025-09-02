import { createSlice } from '@reduxjs/toolkit';

const mockTimeSlots = [
  {
    id: '1',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    subject: 'Data Structures',
    teacher: 'Dr. Smith',
    classroom: 'Room 101',
    class: 'CSE-3A',
  },
  {
    id: '2',
    day: 'Monday',
    startTime: '10:00',
    endTime: '11:00',
    subject: 'Database Systems',
    teacher: 'Prof. Johnson',
    classroom: 'Room 102',
    class: 'CSE-3A',
  },
  {
    id: '3',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:00',
    subject: 'Algorithms',
    teacher: 'Dr. Wilson',
    classroom: 'Room 103',
    class: 'CSE-3A',
  },
];

const mockExamDuties = [
  {
    id: '1',
    teacherId: 'T001',
    teacherName: 'Dr. Smith',
    examDate: '2024-02-15',
    examTime: '10:00-13:00',
    subject: 'Data Structures',
    classroom: 'Room 101',
    status: 'assigned',
  },
  {
    id: '2',
    teacherId: 'T002',
    teacherName: 'Prof. Johnson',
    examDate: '2024-02-16',
    examTime: '14:00-17:00',
    subject: 'Database Systems',
    classroom: 'Room 102',
    status: 'accepted',
  },
];

const initialState = {
  timeSlots: mockTimeSlots,
  examDuties: mockExamDuties,
  selectedClass: 'CSE-3A',
  loading: false,
};

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    addTimeSlot: (state, action) => {
      state.timeSlots.push(action.payload);
    },
    updateTimeSlot: (state, action) => {
      const index = state.timeSlots.findIndex(slot => slot.id === action.payload.id);
      if (index !== -1) {
        state.timeSlots[index] = action.payload;
      }
    },
    deleteTimeSlot: (state, action) => {
      state.timeSlots = state.timeSlots.filter(slot => slot.id !== action.payload);
    },
    addExamDuty: (state, action) => {
      state.examDuties.push(action.payload);
    },
    updateExamDutyStatus: (state, action) => {
      const duty = state.examDuties.find(duty => duty.id === action.payload.id);
      if (duty) {
        duty.status = action.payload.status;
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
  addTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
  addExamDuty,
  updateExamDutyStatus,
  setSelectedClass,
  setLoading
} = timetableSlice.actions;

export default timetableSlice.reducer;