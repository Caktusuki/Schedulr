import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Hero from "./components/Hero.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import Home from "./components/Home.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { TaskProvider } from "./contexts/TaskContext.jsx";
import { SettingsProvider } from "./contexts/SettingsContext.jsx";
import { UserProvider, useUser } from "./contexts/UserContext.jsx";
import { DailyTaskProvider } from "./contexts/DailyTaskContext.jsx";
import MobileHeader from "./components/MobileHeader.jsx";
import { useContext, useState } from "react";
import { ToggleSidebarContext, ToggleValueProvider } from "./contexts/ToggleSidebarContext";




// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    </div>

    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
      </div>

    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function AppContent() {
   const {toggleSidebar}=useContext(ToggleSidebarContext)

   const [showSidebar, setShowSidebar]=useState(false)

  return (
    <>
    <header>
      <MobileHeader showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
    </header>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex-1 transition-colors duration-200">
      <Sidebar showSidebar={showSidebar} aria-label="Main navigation"/>
      <main 
      id="main-content"
      role="main"
      className={`${toggleSidebar? "md:ml-48": "md:ml-16"} flex-1 p-3 sm:p-4 lg:p-10 transition-all h-screen duration-300 overflow-x-hidden`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        </Routes>
      </main>
    </div>
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <SettingsProvider>
        <TaskProvider>
          <DailyTaskProvider>
            <ToggleValueProvider>
              <AppContent />
            </ToggleValueProvider>
          </DailyTaskProvider>
        </TaskProvider>
      </SettingsProvider>
    </UserProvider>
  );
}
