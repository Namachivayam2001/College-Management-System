import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import dashboardReducer from './slices/dashboardSlice'
import userReducer from './slices/userSlice'
import departmentReducer from './slices/departmentSlice'
import teacherReducer from './slices/teacherSlice'
import studentReducer from './slices/studentSlice'
import attendanceSlice from './slices/attendanceSlice'
import timetableSlice from './slices/timetableSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    users: userReducer,
    departments: departmentReducer,
    teachers: teacherReducer,
    students: studentReducer,
    attendance: attendanceSlice,
    timetable: timetableSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
