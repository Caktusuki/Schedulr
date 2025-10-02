import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Hero from "./components/Hero.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import { TaskProvider } from "./contexts/TaskContext.jsx";
import { SettingsProvider } from "./contexts/SettingsContext.jsx";

export default function App() {
  return (
    <SettingsProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-100 flex">
          <Sidebar />
          <main className="flex-1 p-10 ml-44 peer-hover:ml-64  transition-all h-screen duration-300">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/schedule" element={<SchedulePage />} /> 
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </TaskProvider>
    </SettingsProvider>
  );
}
