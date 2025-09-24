import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Hero from "./components/Hero.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import "./styles/theme.css";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-theme-secondary flex transition-colors duration-200">
        <Sidebar />
        <main className="flex-1 p-10 bg-theme-primary">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}
