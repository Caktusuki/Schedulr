import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";

const linkClass = ({ isActive }) =>
  `block w-full text-left px-4 py-2 transition-all duration-300 rounded-md hover:bg-gray-800 ${
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
    <aside className="peer fixed top-0 left-0 bg-gray-900 text-white min-h-screen p-6 transition-all duration-300 w-44 hover:w-64"
    >
      <div className="text-2xl font-bold mb-6">Schedulr</div>

      {/* User Info */}
      {user && (
        <div className="mb-6 p-3 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-300">Logged in as:</p>
          <p className="text-sm font-medium truncate">{user.email}</p>
        </div>
      )}

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={linkClass}>
          Tasks
        </NavLink>
        <NavLink to="/calendar" className={linkClass}>
          Calendar
        </NavLink>
        <NavLink to="/schedule" className={linkClass}>
          Schedule
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          Settings
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
