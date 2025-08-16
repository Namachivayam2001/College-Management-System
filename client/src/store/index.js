import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import dashboardReducer from './slices/dashboardSlice'
import userReducer from './slices/userSlice'
import departmentReducer from './slices/departmentSlice.jsx'
import teacherReducer from './slices/teacherSlice'
import studentReducer from './slices/studentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    users: userReducer,
    departments: departmentReducer,
    teachers: teacherReducer,
    students: studentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
