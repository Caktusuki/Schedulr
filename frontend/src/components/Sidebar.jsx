import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";

const linkClass = ({ isActive }) =>
  `flex gap-2 justify-center sm:justify-start w-full text-left px-4 py-1 sm:py-2 transition-all duration-300 rounded-md hover:bg-gray-800 ${
    isActive ? "bg-gray-800" : ""
  }`;

export default function Sidebar() {
  const { user, logout } = useUser();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <aside className="peer fixed top-0 left-0 bg-gray-900 text-white t min-h-screen p-2 sm:p-4 md:p-6 transition-all duration-300 w-14 sm:w-16 md:w-44 lg:hover:w-64 hover:w-64"
    >
      <div className="text-2xl font-bold mb-6 hidden md:inline">Schedulr</div>
      

      {/* User Info */}
      {user && (
        <div className="mb-6 p-3 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-300">Logged in as:</p>
          <p className="text-sm font-medium truncate">{user.email}</p>
        </div>
      )}

      <nav className="flex flex-col gap-2 flex-1 items-center mt-4">
        <NavLink to="/dashboard" className={linkClass}>
          <span className="text-md sm:text-sm">📊</span>
          <span className="text-sm hidden md:inline lg:inline ">Dashboard</span>
        
        </NavLink>
        <NavLink to="/tasks" className={linkClass}>
           <span className="text-md sm:text-sm">✅</span>
          <span className="text-sm hidden md:inline lg:inline">Tasks</span>
          
        </NavLink>
        <NavLink to="/calendar" className={linkClass}>
         <span className="text-md sm:text-sm">📅</span>
          <span className="text-sm hidden md:inline lg:inline">Calender</span>
          
        </NavLink>
        <NavLink to="/schedule" className={linkClass}>
          <span className="text-md sm:text-sm">⏰</span>
          <span className="text-sm hidden md:inline lg:inline ">Schedule</span>
          
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <span className="text-md sm:text-sm">⚙️</span>
          <span className="text-sm hidden md:inline lg:inline">Settings</span>
        
        </NavLink>
      </nav>

      {/* Logout Button */}
      {user && (
        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
