import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import HodDashboard from "./pages/dashboard/HodDashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Timetable from "./pages/Timetable";
import ExamDuties from "./pages/ExamDuties";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import './App.css';

const queryClient = new QueryClient();

// Component to handle role-based dashboard routing
const DashboardRouter = () => {
  const { user } = useSelector((state) => state.auth);

  // You can uncomment this to redirect to a login page if the user is not authenticated.
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'student':
      return <StudentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'hod':
      return <HodDashboard />;
    default:
      return <AdminDashboard />;
  }
};

const App = () => {
  // Move the user state retrieval here, inside the component that uses it.
  const { user } = useSelector((state) => state.auth);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Fallback for when user is not defined (e.g., on first load) */}
              {!user && <Route path="/" element={<HomePage />} />}
              {/* You can still keep the root route for a public homepage */}
              <Route path="/" element={<HomePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <DashboardLayout>
              <Routes>
                {/* The dynamic path now depends on the user object available in this component */}
                {user && <Route path={`/${user.role}/dashboard`} element={<DashboardRouter />} />}
                <Route path="/students" element={<Students />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/exam-duties" element={<ExamDuties />} />
              </Routes>
            </DashboardLayout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
