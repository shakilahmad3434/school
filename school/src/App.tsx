import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/app/Dashboard";
import AppLayout from "./pages/app/AppLayout";
import Students from "./pages/app/students/Students";
import Subjects from "./pages/app/subjects/Subjects";
import Classes from "./pages/app/classes/Classes";
import Teachers from "./pages/app/teachers/Teachers";
import Employees from "./pages/app/employees/Employees";
import Expenses from "./pages/app/expenses/Expenses";
import Salaries from "./pages/app/salaries/Salaries";
import Payments from "./pages/app/payments/Payments";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useState } from "react";
import AuthContext from "./context/AuthContext";
import Settings from "./pages/app/settings/Settings";
import Attendance from "./pages/app/attendance/Attendance";

const App = () => {
  const [session, setSession] = useState(null)
  const [sessionYear, setSessionYear] = useState("2025-26")
  return (
    <AuthContext.Provider value={{session, setSession, sessionYear, setSessionYear}}>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PublicRoute />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/app" element={<AppLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="students" element={<Students />} />
                    <Route path="subjects" element={<Subjects />} />
                    <Route path="classes" element={<Classes />} />
                    <Route path="teachers" element={<Teachers />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="salaries" element={<Salaries />} />
                    <Route path="payments" element={<Payments />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App